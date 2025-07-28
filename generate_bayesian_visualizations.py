#!/usr/bin/env python3
"""
Generate visualizations for Bayesian Methods in Machine Learning blog post
"""

import numpy as np
import matplotlib.pyplot as plt
import scipy.stats as stats
from scipy.stats import norm, invgamma
import seaborn as sns
from sklearn.datasets import make_regression
from sklearn.preprocessing import StandardScaler

# Set style for consistent, professional plots
plt.style.use('default')
sns.set_palette("husl")

def generate_cover_image():
    """Generate main cover image showing Bayesian workflow"""
    fig, axes = plt.subplots(2, 2, figsize=(14, 10))
    fig.suptitle('Bayesian Methods in Machine Learning', fontsize=20, fontweight='bold')
    
    # Prior distribution
    ax1 = axes[0, 0]
    x = np.linspace(-3, 3, 100)
    prior = norm.pdf(x, 0, 1)
    ax1.plot(x, prior, 'b-', linewidth=3, label='Prior p(θ)')
    ax1.fill_between(x, prior, alpha=0.3)
    ax1.set_title('Prior Beliefs', fontsize=14, fontweight='bold')
    ax1.set_xlabel('Parameter θ')
    ax1.set_ylabel('Density')
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    
    # Likelihood
    ax2 = axes[0, 1]
    theta_true = 1.5
    data_points = np.array([1.2, 1.8, 1.4, 1.6, 1.3])
    likelihood = norm.pdf(x, theta_true, 0.3)
    ax2.plot(x, likelihood, 'r-', linewidth=3, label='Likelihood p(D|θ)')
    ax2.fill_between(x, likelihood, alpha=0.3, color='red')
    ax2.scatter(data_points, [0]*len(data_points), color='red', s=50, alpha=0.8, label='Observed Data')
    ax2.set_title('Likelihood of Data', fontsize=14, fontweight='bold')
    ax2.set_xlabel('Parameter θ')
    ax2.set_ylabel('Density')
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    
    # Posterior
    ax3 = axes[1, 0]
    # Compute posterior (conjugate normal case)
    prior_mean, prior_var = 0, 1
    likelihood_var = 0.3**2
    n_obs = len(data_points)
    data_mean = np.mean(data_points)
    
    posterior_var = 1 / (1/prior_var + n_obs/likelihood_var)
    posterior_mean = posterior_var * (prior_mean/prior_var + n_obs*data_mean/likelihood_var)
    
    posterior = norm.pdf(x, posterior_mean, np.sqrt(posterior_var))
    ax3.plot(x, prior, 'b--', alpha=0.5, label='Prior')
    ax3.plot(x, likelihood/np.max(likelihood)*np.max(posterior), 'r--', alpha=0.5, label='Likelihood (scaled)')
    ax3.plot(x, posterior, 'g-', linewidth=3, label='Posterior p(θ|D)')
    ax3.fill_between(x, posterior, alpha=0.3, color='green')
    ax3.set_title('Posterior Distribution', fontsize=14, fontweight='bold')
    ax3.set_xlabel('Parameter θ')
    ax3.set_ylabel('Density')
    ax3.legend()
    ax3.grid(True, alpha=0.3)
    
    # Prediction uncertainty
    ax4 = axes[1, 1]
    x_new = np.linspace(-2, 4, 100)
    # Sample from posterior to show prediction uncertainty
    np.random.seed(42)
    theta_samples = np.random.normal(posterior_mean, np.sqrt(posterior_var), 1000)
    
    predictions = []
    for theta in theta_samples[:50]:  # Show 50 samples
        pred = x_new * theta + np.random.normal(0, 0.2, len(x_new))
        ax4.plot(x_new, pred, 'g-', alpha=0.1, linewidth=0.5)
    
    # Mean prediction
    mean_pred = x_new * posterior_mean
    ax4.plot(x_new, mean_pred, 'g-', linewidth=3, label='Mean prediction')
    ax4.scatter(data_points, data_points, color='red', s=50, alpha=0.8, label='Training data')
    ax4.set_title('Prediction with Uncertainty', fontsize=14, fontweight='bold')
    ax4.set_xlabel('Input x')
    ax4.set_ylabel('Output y')
    ax4.legend()
    ax4.grid(True, alpha=0.3)
    
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    plt.savefig('/Users/jeremie/dev/projects/myportfolio/v3/public/images/blog/bayesian-methods.jpg', 
                dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("✅ Generated cover image: bayesian-methods.jpg")

def generate_workflow_diagram():
    """Generate Bayesian workflow diagram"""
    fig, axes = plt.subplots(1, 4, figsize=(16, 4))
    fig.suptitle('Bayesian Workflow: From Prior to Prediction', fontsize=16, fontweight='bold')
    
    x = np.linspace(-4, 4, 100)
    
    # Step 1: Prior
    ax1 = axes[0]
    prior = norm.pdf(x, 0, 1.5)
    ax1.plot(x, prior, 'b-', linewidth=3)
    ax1.fill_between(x, prior, alpha=0.3, color='blue')
    ax1.set_title('1. Prior\np(θ)', fontsize=12, fontweight='bold')
    ax1.set_xlabel('θ')
    ax1.set_ylabel('Density')
    ax1.grid(True, alpha=0.3)
    
    # Step 2: Likelihood
    ax2 = axes[1]
    likelihood = norm.pdf(x, 1, 0.8)
    ax2.plot(x, likelihood, 'r-', linewidth=3)
    ax2.fill_between(x, likelihood, alpha=0.3, color='red')
    ax2.set_title('2. Likelihood\np(D|θ)', fontsize=12, fontweight='bold')
    ax2.set_xlabel('θ')
    ax2.set_ylabel('Density')
    ax2.grid(True, alpha=0.3)
    
    # Step 3: Posterior
    ax3 = axes[2]
    # Analytical posterior for conjugate normal
    posterior_mean = (0/1.5**2 + 1/0.8**2) / (1/1.5**2 + 1/0.8**2)
    posterior_var = 1 / (1/1.5**2 + 1/0.8**2)
    posterior = norm.pdf(x, posterior_mean, np.sqrt(posterior_var))
    ax3.plot(x, posterior, 'g-', linewidth=3)
    ax3.fill_between(x, posterior, alpha=0.3, color='green')
    ax3.set_title('3. Posterior\np(θ|D)', fontsize=12, fontweight='bold')
    ax3.set_xlabel('θ')
    ax3.set_ylabel('Density')
    ax3.grid(True, alpha=0.3)
    
    # Step 4: Prediction
    ax4 = axes[3]
    x_pred = np.linspace(-2, 4, 50)
    np.random.seed(42)
    theta_samples = np.random.normal(posterior_mean, np.sqrt(posterior_var), 100)
    
    # Show prediction uncertainty
    for i, theta in enumerate(theta_samples[:30]):
        y_pred = x_pred * theta + np.random.normal(0, 0.3, len(x_pred))
        ax4.plot(x_pred, y_pred, 'purple', alpha=0.1, linewidth=0.5)
    
    # Mean prediction
    y_mean = x_pred * posterior_mean
    ax4.plot(x_pred, y_mean, 'purple', linewidth=3)
    ax4.set_title('4. Prediction\np(y*|x*, D)', fontsize=12, fontweight='bold')
    ax4.set_xlabel('x*')
    ax4.set_ylabel('y*')
    ax4.grid(True, alpha=0.3)
    
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    plt.savefig('/Users/jeremie/dev/projects/myportfolio/v3/public/images/blog/bayesian-workflow.png', 
                dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("✅ Generated workflow diagram: bayesian-workflow.png")

def generate_bayesian_neural_network():
    """Generate Bayesian vs Traditional Neural Network comparison"""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))
    fig.suptitle('Traditional vs Bayesian Neural Networks', fontsize=16, fontweight='bold')
    
    # Generate synthetic data
    np.random.seed(42)
    x = np.linspace(-2, 2, 20)
    y_true = 0.5 * x**3 - x + 0.3 * np.sin(10*x)
    y_obs = y_true + np.random.normal(0, 0.2, len(x))
    
    x_test = np.linspace(-3, 3, 100)
    y_test_true = 0.5 * x_test**3 - x_test + 0.3 * np.sin(10*x_test)
    
    # Traditional Neural Network (single prediction)
    ax1.scatter(x, y_obs, color='red', alpha=0.7, s=50, label='Training Data')
    ax1.plot(x_test, y_test_true, 'k--', alpha=0.5, label='True Function')
    
    # Simulate single deterministic prediction
    y_pred_single = 0.45 * x_test**3 - 0.9*x_test + 0.25 * np.sin(9.5*x_test)
    ax1.plot(x_test, y_pred_single, 'b-', linewidth=3, label='NN Prediction')
    
    ax1.set_title('Traditional Neural Network\n(Point Estimates)', fontsize=14, fontweight='bold')
    ax1.set_xlabel('Input x')
    ax1.set_ylabel('Output y')
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    ax1.set_ylim(-3, 3)
    
    # Bayesian Neural Network (multiple predictions)
    ax2.scatter(x, y_obs, color='red', alpha=0.7, s=50, label='Training Data')
    ax2.plot(x_test, y_test_true, 'k--', alpha=0.5, label='True Function')
    
    # Simulate multiple predictions with uncertainty
    np.random.seed(42)
    predictions = []
    for i in range(50):
        # Add noise to simulate different posterior samples
        noise_scale = 0.1
        y_pred = (0.5 + np.random.normal(0, noise_scale)) * x_test**3 - \
                 (1.0 + np.random.normal(0, noise_scale)) * x_test + \
                 (0.3 + np.random.normal(0, noise_scale*0.5)) * np.sin(10*x_test + np.random.normal(0, 0.5))
        predictions.append(y_pred)
        ax2.plot(x_test, y_pred, 'g-', alpha=0.1, linewidth=1)
    
    # Mean and confidence intervals
    predictions = np.array(predictions)
    mean_pred = np.mean(predictions, axis=0)
    std_pred = np.std(predictions, axis=0)
    
    ax2.plot(x_test, mean_pred, 'g-', linewidth=3, label='BNN Mean')
    ax2.fill_between(x_test, mean_pred - 2*std_pred, mean_pred + 2*std_pred, 
                     alpha=0.3, color='green', label='95% Confidence')
    
    ax2.set_title('Bayesian Neural Network\n(Distributions over Weights)', fontsize=14, fontweight='bold')
    ax2.set_xlabel('Input x')
    ax2.set_ylabel('Output y')
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    ax2.set_ylim(-3, 3)
    
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    plt.savefig('/Users/jeremie/dev/projects/myportfolio/v3/public/images/blog/bayesian-neural-network.png', 
                dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("✅ Generated Bayesian neural network comparison: bayesian-neural-network.png")

def generate_variational_inference():
    """Generate variational inference approximation visualization"""
    fig, axes = plt.subplots(1, 3, figsize=(15, 5))
    fig.suptitle('Variational Inference: Approximating Complex Posteriors', fontsize=16, fontweight='bold')
    
    x = np.linspace(-4, 4, 100)
    
    # True posterior (complex, multimodal)
    ax1 = axes[0]
    true_posterior = 0.4 * norm.pdf(x, -1.5, 0.5) + 0.6 * norm.pdf(x, 1.8, 0.7)
    ax1.plot(x, true_posterior, 'k-', linewidth=3, label='True Posterior p(θ|D)')
    ax1.fill_between(x, true_posterior, alpha=0.3, color='black')
    ax1.set_title('True Posterior\n(Intractable)', fontsize=12, fontweight='bold')
    ax1.set_xlabel('θ')
    ax1.set_ylabel('Density')
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    
    # Variational approximation
    ax2 = axes[1]
    # Find best single Gaussian approximation
    var_mean = 0.5  # Compromise between modes
    var_std = 1.2   # Wide enough to cover both modes
    var_approx = norm.pdf(x, var_mean, var_std)
    
    ax2.plot(x, true_posterior, 'k--', alpha=0.5, label='True Posterior')
    ax2.plot(x, var_approx, 'r-', linewidth=3, label='Variational Approx q(θ)')
    ax2.fill_between(x, var_approx, alpha=0.3, color='red')
    ax2.set_title('Variational\nApproximation', fontsize=12, fontweight='bold')
    ax2.set_xlabel('θ')
    ax2.set_ylabel('Density')
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    
    # KL divergence visualization
    ax3 = axes[2]
    # Show KL divergence as area between curves
    kl_diff = np.log(true_posterior / (var_approx + 1e-10)) * true_posterior
    kl_diff = np.where(true_posterior > 1e-6, kl_diff, 0)  # Avoid numerical issues
    
    ax3.plot(x, true_posterior, 'k-', linewidth=2, label='p(θ|D)')
    ax3.plot(x, var_approx, 'r-', linewidth=2, label='q(θ)')
    ax3.fill_between(x, 0, np.maximum(true_posterior - var_approx, 0), 
                     alpha=0.3, color='blue', label='KL Divergence')
    ax3.set_title('Minimizing\nKL(q||p)', fontsize=12, fontweight='bold')
    ax3.set_xlabel('θ')
    ax3.set_ylabel('Density')
    ax3.legend()
    ax3.grid(True, alpha=0.3)
    
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    plt.savefig('/Users/jeremie/dev/projects/myportfolio/v3/public/images/blog/variational-inference.png', 
                dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("✅ Generated variational inference diagram: variational-inference.png")

def generate_mcmc_traces():
    """Generate MCMC trace plots and diagnostics"""
    fig, axes = plt.subplots(2, 3, figsize=(15, 8))
    fig.suptitle('MCMC Sampling and Diagnostics', fontsize=16, fontweight='bold')
    
    np.random.seed(42)
    
    # Simulate MCMC chains
    n_samples = 1000
    true_mean = 2.0
    
    # Good chain (well-mixed)
    chain1 = np.random.normal(true_mean, 0.5, n_samples)
    chain1 = np.cumsum(chain1 * 0.1) + true_mean  # Add some autocorrelation
    
    # Poor chain (poorly mixed)
    chain2 = np.zeros(n_samples)
    chain2[0] = 0
    for i in range(1, n_samples):
        # High autocorrelation
        chain2[i] = 0.98 * chain2[i-1] + np.random.normal(0, 0.2)
    
    # Trace plots
    ax1 = axes[0, 0]
    ax1.plot(chain1, 'b-', alpha=0.7, linewidth=1)
    ax1.axhline(true_mean, color='red', linestyle='--', linewidth=2, label='True Value')
    ax1.set_title('Good Mixing\n(Low Autocorrelation)', fontsize=12, fontweight='bold')
    ax1.set_xlabel('Iteration')
    ax1.set_ylabel('θ')
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    
    ax2 = axes[0, 1]
    ax2.plot(chain2, 'r-', alpha=0.7, linewidth=1)
    ax2.axhline(true_mean, color='red', linestyle='--', linewidth=2, label='True Value')
    ax2.set_title('Poor Mixing\n(High Autocorrelation)', fontsize=12, fontweight='bold')
    ax2.set_xlabel('Iteration')
    ax2.set_ylabel('θ')
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    
    # Posterior distributions
    ax3 = axes[0, 2]
    ax3.hist(chain1[200:], bins=30, alpha=0.5, density=True, color='blue', label='Good Chain')
    ax3.hist(chain2[200:], bins=30, alpha=0.5, density=True, color='red', label='Poor Chain')
    ax3.axvline(true_mean, color='black', linestyle='--', linewidth=2, label='True Value')
    ax3.set_title('Posterior Estimates', fontsize=12, fontweight='bold')
    ax3.set_xlabel('θ')
    ax3.set_ylabel('Density')
    ax3.legend()
    ax3.grid(True, alpha=0.3)
    
    # Autocorrelation functions
    def autocorrelation(x, max_lags=50):
        """Simple autocorrelation function calculation"""
        n = len(x)
        x = x - np.mean(x)
        autocorr = np.correlate(x, x, mode='full')
        autocorr = autocorr[n-1:]
        autocorr = autocorr / autocorr[0]
        return autocorr[:max_lags]
    
    ax4 = axes[1, 0]
    lags = np.arange(50)
    acf1 = autocorrelation(chain1, 50)
    acf2 = autocorrelation(chain2, 50)
    
    ax4.plot(lags, acf1, 'b-o', markersize=3, label='Good Chain')
    ax4.plot(lags, acf2, 'r-o', markersize=3, label='Poor Chain')
    ax4.axhline(0, color='black', linestyle='-', alpha=0.3)
    ax4.axhline(0.05, color='gray', linestyle='--', alpha=0.5, label='5% threshold')
    ax4.set_title('Autocorrelation Function', fontsize=12, fontweight='bold')
    ax4.set_xlabel('Lag')
    ax4.set_ylabel('Autocorrelation')
    ax4.legend()
    ax4.grid(True, alpha=0.3)
    
    # Running mean
    ax5 = axes[1, 1]
    running_mean1 = np.cumsum(chain1) / np.arange(1, len(chain1) + 1)
    running_mean2 = np.cumsum(chain2) / np.arange(1, len(chain2) + 1)
    
    ax5.plot(running_mean1, 'b-', linewidth=2, label='Good Chain')
    ax5.plot(running_mean2, 'r-', linewidth=2, label='Poor Chain')
    ax5.axhline(true_mean, color='black', linestyle='--', linewidth=2, label='True Value')
    ax5.set_title('Running Average', fontsize=12, fontweight='bold')
    ax5.set_xlabel('Iteration')
    ax5.set_ylabel('Running Mean')
    ax5.legend()
    ax5.grid(True, alpha=0.3)
    
    # Effective sample size illustration
    ax6 = axes[1, 2]
    # Approximate ESS calculation
    ess1 = len(chain1) / (1 + 2 * np.sum(acf1[1:20]))  # Simplified
    ess2 = len(chain2) / (1 + 2 * np.sum(acf2[1:20]))
    
    bars = ax6.bar(['Good Chain', 'Poor Chain'], [ess1, ess2], 
                   color=['blue', 'red'], alpha=0.7)
    ax6.axhline(len(chain1), color='black', linestyle='--', alpha=0.5, label='Total Samples')
    ax6.set_title('Effective Sample Size', fontsize=12, fontweight='bold')
    ax6.set_ylabel('Effective Samples')
    ax6.legend()
    ax6.grid(True, alpha=0.3)
    
    # Add values on bars
    for bar, ess in zip(bars, [ess1, ess2]):
        height = bar.get_height()
        ax6.text(bar.get_x() + bar.get_width()/2., height + 10,
                f'{int(ess)}', ha='center', va='bottom', fontweight='bold')
    
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    plt.savefig('/Users/jeremie/dev/projects/myportfolio/v3/public/images/blog/mcmc-diagnostics.png', 
                dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("✅ Generated MCMC diagnostics: mcmc-diagnostics.png")

if __name__ == "__main__":
    print("🎨 Generating visualizations for Bayesian Methods blog post...")
    
    # Create images directory if it doesn't exist
    import os
    os.makedirs('/Users/jeremie/dev/projects/myportfolio/v3/public/images/blog', exist_ok=True)
    
    # Generate all visualizations
    generate_cover_image()
    generate_workflow_diagram()
    generate_bayesian_neural_network()
    generate_variational_inference()
    generate_mcmc_traces()
    
    print("\n🎉 All visualizations generated successfully!")
    print("📁 Images saved to: /public/images/blog/")
    print("\nGenerated files:")
    print("- bayesian-methods.jpg (cover image)")
    print("- bayesian-workflow.png")
    print("- bayesian-neural-network.png")
    print("- variational-inference.png")
    print("- mcmc-diagnostics.png")
