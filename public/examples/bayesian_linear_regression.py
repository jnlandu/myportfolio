#!/usr/bin/env python3
"""
Bayesian Linear Regression Implementation
A practical example for the Bayesian Methods in Machine Learning blog post
"""

import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import norm, invgamma
from sklearn.datasets import make_regression
from sklearn.preprocessing import StandardScaler

class BayesianLinearRegression:
    """
    Bayesian Linear Regression with conjugate priors
    
    This implementation demonstrates the core concepts from the blog post
    with a practical, runnable example.
    """
    
    def __init__(self, alpha=1.0, beta=1.0):
        """
        Initialize with hyperparameters
        
        Args:
            alpha: Precision of the prior over weights (higher = more regularization)
            beta: Precision of the noise (higher = less noise expected)
        """
        self.alpha = alpha
        self.beta = beta
        self.fitted = False
        
    def fit(self, X, y):
        """
        Fit the Bayesian linear regression model
        
        Args:
            X: Input features (n_samples, n_features)
            y: Target values (n_samples,)
        """
        # Add bias term (intercept)
        X = np.column_stack([np.ones(X.shape[0]), X])
        self.n_features = X.shape[1]
        
        # Store training data
        self.X_train = X
        self.y_train = y
        
        # Prior parameters
        S0_inv = self.alpha * np.eye(self.n_features)
        m0 = np.zeros(self.n_features)
        
        # Posterior parameters (conjugate update)
        SN_inv = S0_inv + self.beta * X.T @ X
        self.SN = np.linalg.inv(SN_inv)  # Posterior covariance
        self.mN = self.SN @ (S0_inv @ m0 + self.beta * X.T @ y)  # Posterior mean
        
        self.fitted = True
        
    def predict(self, X_test, return_std=False, n_samples=None):
        """
        Make predictions with uncertainty quantification
        
        Args:
            X_test: Test inputs (n_test, n_features)
            return_std: Whether to return prediction uncertainty
            n_samples: If provided, return samples from posterior predictive
            
        Returns:
            predictions: Mean predictions or samples
            std: Standard deviations (if return_std=True)
        """
        if not self.fitted:
            raise ValueError("Model must be fitted before prediction")
            
        # Add bias term
        X_test = np.column_stack([np.ones(X_test.shape[0]), X_test])
        
        if n_samples is not None:
            # Sample from posterior predictive distribution
            weight_samples = np.random.multivariate_normal(self.mN, self.SN, n_samples)
            predictions = X_test @ weight_samples.T
            noise_samples = np.random.normal(0, 1/np.sqrt(self.beta), 
                                           size=(X_test.shape[0], n_samples))
            predictions += noise_samples
            return predictions
        
        # Predictive mean
        y_mean = X_test @ self.mN
        
        if return_std:
            # Predictive variance = model uncertainty + noise
            y_var = 1/self.beta + np.diag(X_test @ self.SN @ X_test.T)
            y_std = np.sqrt(y_var)
            return y_mean, y_std
        
        return y_mean
    
    def plot_posterior_weights(self):
        """Visualize the posterior distribution over weights"""
        if not self.fitted:
            raise ValueError("Model must be fitted before plotting")
            
        fig, axes = plt.subplots(1, self.n_features, figsize=(4*self.n_features, 4))
        if self.n_features == 1:
            axes = [axes]
            
        for i, ax in enumerate(axes):
            # Plot prior and posterior
            weight_range = np.linspace(self.mN[i] - 3*np.sqrt(self.SN[i,i]), 
                                     self.mN[i] + 3*np.sqrt(self.SN[i,i]), 100)
            
            # Prior
            prior_std = 1/np.sqrt(self.alpha)
            prior_pdf = norm.pdf(weight_range, 0, prior_std)
            ax.plot(weight_range, prior_pdf, 'b--', alpha=0.7, label='Prior')
            
            # Posterior
            posterior_pdf = norm.pdf(weight_range, self.mN[i], np.sqrt(self.SN[i,i]))
            ax.plot(weight_range, posterior_pdf, 'r-', linewidth=2, label='Posterior')
            ax.fill_between(weight_range, posterior_pdf, alpha=0.3, color='red')
            
            weight_name = 'Bias' if i == 0 else f'Weight {i}'
            ax.set_title(f'{weight_name}')
            ax.set_xlabel('Value')
            ax.set_ylabel('Density')
            ax.legend()
            ax.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.show()

def demo_bayesian_regression():
    """
    Demonstrate Bayesian linear regression with a practical example
    """
    print("🎯 Bayesian Linear Regression Demo")
    print("=" * 40)
    
    # Generate synthetic data
    np.random.seed(42)
    X, y = make_regression(n_samples=50, n_features=1, noise=0.3, random_state=42)
    
    # Standardize features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Split into train/test
    n_train = 30
    X_train, X_test = X_scaled[:n_train], X_scaled[n_train:]
    y_train, y_test = y[:n_train], y[n_train:]
    
    # Fit Bayesian model
    print("🔧 Fitting Bayesian Linear Regression...")
    model = BayesianLinearRegression(alpha=2.0, beta=25.0)
    model.fit(X_train, y_train)
    
    # Make predictions with uncertainty
    y_pred, y_std = model.predict(X_test, return_std=True)
    
    # Calculate metrics
    mse = np.mean((y_test - y_pred)**2)
    print(f"📊 Test MSE: {mse:.3f}")
    print(f"📏 Mean prediction std: {np.mean(y_std):.3f}")
    
    # Visualize results
    plt.figure(figsize=(12, 8))
    
    # Plot 1: Data and predictions
    plt.subplot(2, 2, 1)
    x_plot = np.linspace(X_scaled.min(), X_scaled.max(), 100).reshape(-1, 1)
    y_plot, y_plot_std = model.predict(x_plot, return_std=True)
    
    plt.scatter(X_train.ravel(), y_train, color='blue', alpha=0.6, label='Training Data')
    plt.scatter(X_test.ravel(), y_test, color='red', alpha=0.6, label='Test Data')
    plt.plot(x_plot.ravel(), y_plot, 'g-', linewidth=2, label='Bayesian Prediction')
    plt.fill_between(x_plot.ravel(), y_plot - 2*y_plot_std, y_plot + 2*y_plot_std,
                     alpha=0.2, color='green', label='95% Confidence')
    plt.xlabel('X')
    plt.ylabel('y')
    plt.title('Bayesian Linear Regression with Uncertainty')
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    # Plot 2: Posterior samples
    plt.subplot(2, 2, 2)
    samples = model.predict(x_plot, n_samples=20)
    for i in range(samples.shape[1]):
        plt.plot(x_plot.ravel(), samples[:, i], 'g-', alpha=0.3, linewidth=1)
    plt.scatter(X_train.ravel(), y_train, color='blue', alpha=0.6)
    plt.plot(x_plot.ravel(), y_plot, 'g-', linewidth=3, label='Mean Prediction')
    plt.xlabel('X')
    plt.ylabel('y')
    plt.title('Posterior Predictive Samples')
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    # Plot 3: Prediction uncertainty vs input
    plt.subplot(2, 2, 3)
    plt.plot(x_plot.ravel(), y_plot_std, 'purple', linewidth=2)
    plt.xlabel('X')
    plt.ylabel('Prediction Std')
    plt.title('Prediction Uncertainty')
    plt.grid(True, alpha=0.3)
    
    # Plot 4: Posterior over weights
    plt.subplot(2, 2, 4)
    if model.n_features == 2:  # bias + 1 feature
        # Plot 2D posterior
        w0_range = np.linspace(model.mN[0] - 3*np.sqrt(model.SN[0,0]), 
                              model.mN[0] + 3*np.sqrt(model.SN[0,0]), 50)
        w1_range = np.linspace(model.mN[1] - 3*np.sqrt(model.SN[1,1]), 
                              model.mN[1] + 3*np.sqrt(model.SN[1,1]), 50)
        W0, W1 = np.meshgrid(w0_range, w1_range)
        
        # Evaluate 2D Gaussian
        pos = np.dstack((W0, W1))
        from scipy.stats import multivariate_normal
        rv = multivariate_normal(model.mN, model.SN)
        
        plt.contour(W0, W1, rv.pdf(pos), levels=5)
        plt.scatter(model.mN[0], model.mN[1], color='red', s=100, marker='x', 
                   linewidth=3, label='Posterior Mean')
        plt.xlabel('Bias')
        plt.ylabel('Weight')
        plt.title('Posterior Distribution (Weights)')
        plt.legend()
        plt.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.show()
    
    print("\n✨ Key takeaways:")
    print("- Bayesian regression provides uncertainty estimates")
    print("- Confidence intervals show where model is uncertain")
    print("- Posterior samples show range of plausible functions")
    print("- Prior regularizes to prevent overfitting")

if __name__ == "__main__":
    demo_bayesian_regression()
