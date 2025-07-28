#!/usr/bin/env python3
"""
Generate visualizations for Flask and Machine Learning Integration blog post
"""

import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from matplotlib.patches import Rectangle, FancyBboxPatch
import matplotlib.patches as mpatches
from sklearn.datasets import make_classification
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix
import pandas as pd

# Set style for consistent, professional plots
plt.style.use('default')
sns.set_palette("husl")

def generate_cover_image():
    """Generate main cover image showing Flask-ML integration architecture"""
    fig, ax = plt.subplots(figsize=(14, 10))
    fig.suptitle('Flask and Machine Learning Integration', fontsize=20, fontweight='bold')
    
    # Define colors
    flask_color = '#1f77b4'
    ml_color = '#ff7f0e'
    api_color = '#2ca02c'
    db_color = '#d62728'
    
    # Draw architecture components
    # Client layer
    client_box = FancyBboxPatch((1, 8), 2, 1, boxstyle="round,pad=0.1", 
                                facecolor='lightblue', edgecolor='black', linewidth=2)
    ax.add_patch(client_box)
    ax.text(2, 8.5, 'Web Client\n(Browser/Mobile)', ha='center', va='center', fontweight='bold')
    
    # API Gateway
    api_box = FancyBboxPatch((5, 8), 2, 1, boxstyle="round,pad=0.1", 
                             facecolor=api_color, edgecolor='black', linewidth=2, alpha=0.7)
    ax.add_patch(api_box)
    ax.text(6, 8.5, 'API Gateway\n(Load Balancer)', ha='center', va='center', fontweight='bold', color='white')
    
    # Flask applications
    flask_apps = [(2, 6), (4, 6), (6, 6)]
    for i, (x, y) in enumerate(flask_apps):
        flask_box = FancyBboxPatch((x-0.7, y-0.4), 1.4, 0.8, boxstyle="round,pad=0.05", 
                                   facecolor=flask_color, edgecolor='black', linewidth=1, alpha=0.8)
        ax.add_patch(flask_box)
        ax.text(x, y, f'Flask App\n{i+1}', ha='center', va='center', fontweight='bold', color='white', fontsize=10)
    
    # ML Model layer
    ml_models = [(1.5, 4), (3.5, 4), (5.5, 4)]
    model_names = ['Classification\nModel', 'Regression\nModel', 'NLP\nModel']
    for i, ((x, y), name) in enumerate(zip(ml_models, model_names)):
        ml_box = FancyBboxPatch((x-0.6, y-0.4), 1.2, 0.8, boxstyle="round,pad=0.05", 
                                facecolor=ml_color, edgecolor='black', linewidth=1, alpha=0.8)
        ax.add_patch(ml_box)
        ax.text(x, y, name, ha='center', va='center', fontweight='bold', color='white', fontsize=9)
    
    # Database layer
    db_box = FancyBboxPatch((3, 2), 2, 1, boxstyle="round,pad=0.1", 
                            facecolor=db_color, edgecolor='black', linewidth=2, alpha=0.8)
    ax.add_patch(db_box)
    ax.text(4, 2.5, 'Model Storage\n& Cache', ha='center', va='center', fontweight='bold', color='white')
    
    # Monitoring
    monitor_box = FancyBboxPatch((8, 6), 1.5, 1, boxstyle="round,pad=0.1", 
                                 facecolor='purple', edgecolor='black', linewidth=2, alpha=0.7)
    ax.add_patch(monitor_box)
    ax.text(8.75, 6.5, 'Monitoring\n& Logging', ha='center', va='center', fontweight='bold', color='white')
    
    # Draw arrows
    arrow_props = dict(arrowstyle='->', lw=2, color='gray')
    
    # Client to API Gateway
    ax.annotate('', xy=(5, 8.5), xytext=(3, 8.5), arrowprops=arrow_props)
    
    # API Gateway to Flask apps
    for x, y in flask_apps:
        ax.annotate('', xy=(x, y+0.4), xytext=(6, 8), arrowprops=arrow_props)
    
    # Flask apps to ML models
    for (fx, fy), (mx, my) in zip(flask_apps, ml_models):
        ax.annotate('', xy=(mx, my+0.4), xytext=(fx, fy-0.4), arrowprops=arrow_props)
    
    # ML models to database
    for mx, my in ml_models:
        ax.annotate('', xy=(4, 3), xytext=(mx, my-0.4), arrowprops=arrow_props)
    
    # Flask apps to monitoring
    ax.annotate('', xy=(8, 6.5), xytext=(7, 6), arrowprops=arrow_props)
    
    # Add labels and annotations
    ax.text(9.5, 9, 'Request Flow', fontsize=14, fontweight='bold', 
            bbox=dict(boxstyle="round,pad=0.3", facecolor='lightgray'))
    
    ax.text(0.5, 5, 'Features:\n• RESTful APIs\n• Model Serving\n• Input Validation\n• Error Handling\n• Caching\n• Authentication', 
            fontsize=11, bbox=dict(boxstyle="round,pad=0.5", facecolor='lightyellow'))
    
    ax.set_xlim(0, 10)
    ax.set_ylim(1, 10)
    ax.axis('off')
    
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    plt.savefig('/Users/jeremie/dev/projects/myportfolio/v3/public/images/blog/flask-ml-integration.jpg', 
                dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("✅ Generated cover image: flask-ml-integration.jpg")

def generate_flask_architecture():
    """Generate Flask architecture diagram"""
    fig, ax = plt.subplots(figsize=(12, 8))
    fig.suptitle('Flask Application Architecture for ML', fontsize=16, fontweight='bold')
    
    # Define layers
    layers = [
        ('Presentation Layer', 7, ['Flask Routes', 'API Endpoints', 'Request Handling']),
        ('Business Logic Layer', 5, ['Input Validation', 'Model Management', 'Response Formatting']),
        ('Model Layer', 3, ['ML Models', 'Preprocessing', 'Prediction Logic']),
        ('Data Layer', 1, ['Model Storage', 'Cache', 'Logging'])
    ]
    
    colors = ['#3498db', '#e74c3c', '#f39c12', '#27ae60']
    
    for i, (layer_name, y, components) in enumerate(layers):
        # Draw layer background
        layer_box = Rectangle((1, y-0.8), 10, 1.6, facecolor=colors[i], alpha=0.3, edgecolor='black')
        ax.add_patch(layer_box)
        
        # Layer title
        ax.text(0.5, y, layer_name, fontsize=12, fontweight='bold', rotation=90, 
                ha='center', va='center')
        
        # Components
        comp_width = 10 / len(components)
        for j, comp in enumerate(components):
            comp_x = 1 + j * comp_width + comp_width/2
            comp_box = FancyBboxPatch((comp_x - comp_width/2 + 0.1, y-0.6), 
                                      comp_width-0.2, 1.2, boxstyle="round,pad=0.05", 
                                      facecolor=colors[i], edgecolor='black', alpha=0.8)
            ax.add_patch(comp_box)
            ax.text(comp_x, y, comp, ha='center', va='center', fontweight='bold', 
                    color='white', fontsize=10)
    
    # Add arrows between layers
    arrow_props = dict(arrowstyle='<->', lw=2, color='black')
    for i in range(len(layers)-1):
        y1 = layers[i][1] - 0.8
        y2 = layers[i+1][1] + 0.8
        ax.annotate('', xy=(6, y2), xytext=(6, y1), arrowprops=arrow_props)
    
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 8.5)
    ax.axis('off')
    
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    plt.savefig('/Users/jeremie/dev/projects/myportfolio/v3/public/images/blog/flask-architecture.png', 
                dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("✅ Generated Flask architecture diagram: flask-architecture.png")

def generate_api_endpoints():
    """Generate API endpoints visualization"""
    fig, ax = plt.subplots(figsize=(12, 8))
    fig.suptitle('Flask ML API Endpoints', fontsize=16, fontweight='bold')
    
    # Define endpoints
    endpoints = [
        ('/api/health', 'GET', 'Check API health status', '#2ecc71'),
        ('/api/predict', 'POST', 'Single prediction', '#3498db'),
        ('/api/predict/batch', 'POST', 'Batch predictions', '#9b59b6'),
        ('/api/model/info', 'GET', 'Model information', '#f39c12'),
        ('/api/model/reload', 'POST', 'Reload model', '#e74c3c'),
        ('/api/stats', 'GET', 'Performance stats', '#1abc9c')
    ]
    
    # Draw endpoints
    y_positions = np.linspace(6.5, 1.5, len(endpoints))
    
    for i, (endpoint, method, description, color) in enumerate(endpoints):
        y = y_positions[i]
        
        # Method box
        method_box = FancyBboxPatch((1, y-0.3), 1.5, 0.6, boxstyle="round,pad=0.05", 
                                    facecolor=color, edgecolor='black', alpha=0.9)
        ax.add_patch(method_box)
        ax.text(1.75, y, method, ha='center', va='center', fontweight='bold', 
                color='white', fontsize=11)
        
        # Endpoint path
        ax.text(3, y, endpoint, ha='left', va='center', fontweight='bold', fontsize=12)
        
        # Description
        ax.text(7, y, description, ha='left', va='center', fontsize=10, color='gray')
        
        # Example request/response
        if endpoint == '/api/predict':
            example_box = Rectangle((1, y-0.8), 10, 0.4, facecolor='lightgray', alpha=0.5)
            ax.add_patch(example_box)
            ax.text(1.1, y-0.6, 'Example: POST {"features": [1.2, 3.4, ...]} → {"prediction": 1, "confidence": 0.85}', 
                    ha='left', va='center', fontsize=9, style='italic')
    
    # Add legend
    legend_elements = [
        mpatches.Patch(color='#2ecc71', label='Health Check'),
        mpatches.Patch(color='#3498db', label='Prediction'),
        mpatches.Patch(color='#9b59b6', label='Batch Processing'),
        mpatches.Patch(color='#f39c12', label='Information'),
        mpatches.Patch(color='#e74c3c', label='Management'),
        mpatches.Patch(color='#1abc9c', label='Monitoring')
    ]
    ax.legend(handles=legend_elements, loc='upper right', bbox_to_anchor=(0.98, 0.98))
    
    ax.set_xlim(0, 12)
    ax.set_ylim(0.5, 7.5)
    ax.axis('off')
    
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    plt.savefig('/Users/jeremie/dev/projects/myportfolio/v3/public/images/blog/flask-api-endpoints.png', 
                dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("✅ Generated API endpoints diagram: flask-api-endpoints.png")

def generate_performance_metrics():
    """Generate performance optimization visualization"""
    fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(14, 10))
    fig.suptitle('Flask ML API Performance Optimization', fontsize=16, fontweight='bold')
    
    # Response time comparison
    categories = ['Without\nOptimization', 'With\nCaching', 'With\nBatch Processing', 'With\nLoad Balancing']
    response_times = [450, 120, 80, 45]
    colors = ['#e74c3c', '#f39c12', '#2ecc71', '#3498db']
    
    bars = ax1.bar(categories, response_times, color=colors, alpha=0.8)
    ax1.set_title('Response Time Comparison (ms)', fontweight='bold')
    ax1.set_ylabel('Response Time (ms)')
    
    # Add value labels on bars
    for bar, time in zip(bars, response_times):
        height = bar.get_height()
        ax1.text(bar.get_x() + bar.get_width()/2., height + 10,
                f'{time}ms', ha='center', va='bottom', fontweight='bold')
    
    # Throughput comparison
    throughput = [22, 85, 150, 280]
    bars2 = ax2.bar(categories, throughput, color=colors, alpha=0.8)
    ax2.set_title('Throughput Comparison (req/min)', fontweight='bold')
    ax2.set_ylabel('Requests per Minute')
    
    for bar, tput in zip(bars2, throughput):
        height = bar.get_height()
        ax2.text(bar.get_x() + bar.get_width()/2., height + 5,
                f'{tput}', ha='center', va='bottom', fontweight='bold')
    
    # Cache hit ratio over time
    time_points = np.arange(0, 60, 5)
    cache_hits = [0, 15, 35, 52, 68, 78, 85, 88, 90, 91, 92, 92]
    
    ax3.plot(time_points, cache_hits, 'o-', linewidth=3, markersize=6, color='#2ecc71')
    ax3.fill_between(time_points, cache_hits, alpha=0.3, color='#2ecc71')
    ax3.set_title('Cache Hit Ratio Over Time', fontweight='bold')
    ax3.set_xlabel('Time (minutes)')
    ax3.set_ylabel('Cache Hit Ratio (%)')
    ax3.grid(True, alpha=0.3)
    ax3.set_ylim(0, 100)
    
    # Error rate comparison
    error_scenarios = ['No Validation', 'Basic Validation', 'Comprehensive\nValidation', 'With Error\nHandling']
    error_rates = [15.2, 8.7, 2.1, 0.3]
    
    bars3 = ax4.bar(error_scenarios, error_rates, color=['#e74c3c', '#f39c12', '#2ecc71', '#3498db'], alpha=0.8)
    ax4.set_title('Error Rate Comparison (%)', fontweight='bold')
    ax4.set_ylabel('Error Rate (%)')
    
    for bar, rate in zip(bars3, error_rates):
        height = bar.get_height()
        ax4.text(bar.get_x() + bar.get_width()/2., height + 0.2,
                f'{rate}%', ha='center', va='bottom', fontweight='bold')
    
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    plt.savefig('/Users/jeremie/dev/projects/myportfolio/v3/public/images/blog/flask-performance.png', 
                dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("✅ Generated performance metrics: flask-performance.png")

def generate_deployment_architecture():
    """Generate deployment architecture diagram"""
    fig, ax = plt.subplots(figsize=(14, 10))
    fig.suptitle('Production Deployment Architecture', fontsize=16, fontweight='bold')
    
    # Internet cloud
    from matplotlib.patches import Ellipse
    internet = Ellipse((2, 8.5), 3, 1, facecolor='lightblue', alpha=0.7, edgecolor='blue')
    ax.add_patch(internet)
    ax.text(2, 8.5, 'Internet', ha='center', va='center', fontweight='bold', fontsize=12)
    
    # Load Balancer
    lb_box = FancyBboxPatch((5.5, 8), 2, 1, boxstyle="round,pad=0.1", 
                            facecolor='orange', edgecolor='black', linewidth=2, alpha=0.8)
    ax.add_patch(lb_box)
    ax.text(6.5, 8.5, 'Load Balancer\n(Nginx)', ha='center', va='center', fontweight='bold', color='white')
    
    # Docker containers
    container_positions = [(4, 6), (6, 6), (8, 6)]
    for i, (x, y) in enumerate(container_positions):
        # Docker container
        container_box = FancyBboxPatch((x-0.8, y-0.6), 1.6, 1.2, boxstyle="round,pad=0.05", 
                                       facecolor='#0066cc', edgecolor='black', linewidth=2, alpha=0.9)
        ax.add_patch(container_box)
        
        # Flask app inside container
        flask_box = FancyBboxPatch((x-0.6, y-0.4), 1.2, 0.8, boxstyle="round,pad=0.05", 
                                   facecolor='#1f77b4', edgecolor='white', linewidth=1)
        ax.add_patch(flask_box)
        
        ax.text(x, y+0.4, f'Docker {i+1}', ha='center', va='center', fontweight='bold', 
                color='white', fontsize=9)
        ax.text(x, y, f'Flask ML\nAPI', ha='center', va='center', fontweight='bold', 
                color='white', fontsize=9)
    
    # Redis Cache
    redis_box = FancyBboxPatch((10, 6), 1.5, 1, boxstyle="round,pad=0.1", 
                               facecolor='red', edgecolor='black', linewidth=2, alpha=0.8)
    ax.add_patch(redis_box)
    ax.text(10.75, 6.5, 'Redis\nCache', ha='center', va='center', fontweight='bold', color='white')
    
    # Database
    db_box = FancyBboxPatch((5.5, 4), 2, 1, boxstyle="round,pad=0.1", 
                            facecolor='green', edgecolor='black', linewidth=2, alpha=0.8)
    ax.add_patch(db_box)
    ax.text(6.5, 4.5, 'Model Storage\n(PostgreSQL)', ha='center', va='center', fontweight='bold', color='white')
    
    # Monitoring stack
    monitor_box = FancyBboxPatch((9, 4), 2.5, 1, boxstyle="round,pad=0.1", 
                                 facecolor='purple', edgecolor='black', linewidth=2, alpha=0.8)
    ax.add_patch(monitor_box)
    ax.text(10.25, 4.5, 'Monitoring\n(Prometheus + Grafana)', ha='center', va='center', 
            fontweight='bold', color='white', fontsize=9)
    
    # File storage
    storage_box = FancyBboxPatch((2, 4), 2, 1, boxstyle="round,pad=0.1", 
                                 facecolor='brown', edgecolor='black', linewidth=2, alpha=0.8)
    ax.add_patch(storage_box)
    ax.text(3, 4.5, 'Model Files\n(S3/NFS)', ha='center', va='center', fontweight='bold', color='white')
    
    # Log aggregation
    log_box = FancyBboxPatch((5.5, 2), 2, 1, boxstyle="round,pad=0.1", 
                             facecolor='gray', edgecolor='black', linewidth=2, alpha=0.8)
    ax.add_patch(log_box)
    ax.text(6.5, 2.5, 'Log Aggregation\n(ELK Stack)', ha='center', va='center', fontweight='bold', color='white')
    
    # Draw connections
    arrow_props = dict(arrowstyle='->', lw=2, color='gray')
    
    # Internet to Load Balancer
    ax.annotate('', xy=(5.5, 8.5), xytext=(3.5, 8.5), arrowprops=arrow_props)
    
    # Load Balancer to containers
    for x, y in container_positions:
        ax.annotate('', xy=(x, y+0.6), xytext=(6.5, 8), arrowprops=arrow_props)
    
    # Containers to Redis
    ax.annotate('', xy=(10, 6.5), xytext=(8.8, 6), arrowprops=arrow_props)
    
    # Containers to Database
    for x, y in container_positions:
        ax.annotate('', xy=(6.5, 5), xytext=(x, y-0.6), arrowprops=arrow_props)
    
    # Add deployment benefits text
    ax.text(0.5, 1, 'Benefits:\n• High Availability\n• Load Distribution\n• Easy Scaling\n• Fault Tolerance\n• Monitoring & Logging', 
            fontsize=11, bbox=dict(boxstyle="round,pad=0.5", facecolor='lightyellow'))
    
    ax.set_xlim(0, 12.5)
    ax.set_ylim(0.5, 9.5)
    ax.axis('off')
    
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    plt.savefig('/Users/jeremie/dev/projects/myportfolio/v3/public/images/blog/flask-deployment.png', 
                dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("✅ Generated deployment architecture: flask-deployment.png")

def generate_model_pipeline():
    """Generate ML model pipeline visualization"""
    fig, ax = plt.subplots(figsize=(14, 8))
    fig.suptitle('Machine Learning Model Pipeline in Flask', fontsize=16, fontweight='bold')
    
    # Pipeline stages
    stages = [
        ('Raw Data', 1, '#e74c3c'),
        ('Preprocessing', 3, '#f39c12'),
        ('Feature Engineering', 5, '#f1c40f'),
        ('Model Training', 7, '#2ecc71'),
        ('Model Validation', 9, '#3498db'),
        ('Model Deployment', 11, '#9b59b6'),
        ('Monitoring', 13, '#34495e')
    ]
    
    y_center = 4
    
    for i, (stage_name, x, color) in enumerate(stages):
        # Stage box
        stage_box = FancyBboxPatch((x-0.8, y_center-0.6), 1.6, 1.2, 
                                   boxstyle="round,pad=0.1", facecolor=color, 
                                   edgecolor='black', linewidth=2, alpha=0.9)
        ax.add_patch(stage_box)
        ax.text(x, y_center, stage_name, ha='center', va='center', 
                fontweight='bold', color='white', fontsize=10)
        
        # Arrow to next stage
        if i < len(stages) - 1:
            next_x = stages[i+1][1]
            ax.annotate('', xy=(next_x-0.8, y_center), xytext=(x+0.8, y_center),
                       arrowprops=dict(arrowstyle='->', lw=3, color='black'))
    
    # Add details for each stage
    details = [
        'CSV, JSON\nAPI calls',
        'Clean, Validate\nNormalize',
        'Transform\nSelect Features',
        'Fit Model\nTune Parameters',
        'Cross-validation\nMetrics',
        'Flask API\nDocker Container',
        'Logs, Metrics\nAlerts'
    ]
    
    for (stage_name, x, color), detail in zip(stages, details):
        ax.text(x, y_center-1.5, detail, ha='center', va='center', 
                fontsize=9, style='italic', color='gray',
                bbox=dict(boxstyle="round,pad=0.3", facecolor='white', alpha=0.8))
    
    # Add Flask integration points
    flask_points = [3, 7, 11, 13]  # Preprocessing, Training, Deployment, Monitoring
    for x in flask_points:
        flask_icon = FancyBboxPatch((x-0.3, y_center+1.2), 0.6, 0.4, 
                                    boxstyle="round,pad=0.05", facecolor='#1f77b4', 
                                    edgecolor='black', alpha=0.8)
        ax.add_patch(flask_icon)
        ax.text(x, y_center+1.4, 'Flask', ha='center', va='center', 
                fontweight='bold', color='white', fontsize=8)
        
        # Connection line
        ax.plot([x, x], [y_center+0.6, y_center+1.2], 'k--', alpha=0.5, linewidth=1)
    
    ax.set_xlim(0, 14)
    ax.set_ylim(1.5, 6.5)
    ax.axis('off')
    
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    plt.savefig('/Users/jeremie/dev/projects/myportfolio/v3/public/images/blog/ml-pipeline.png', 
                dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("✅ Generated ML pipeline diagram: ml-pipeline.png")

if __name__ == "__main__":
    print("🎨 Generating visualizations for Flask ML Integration blog post...")
    
    # Create images directory if it doesn't exist
    import os
    os.makedirs('/Users/jeremie/dev/projects/myportfolio/v3/public/images/blog', exist_ok=True)
    
    # Generate all visualizations
    generate_cover_image()
    generate_flask_architecture()
    generate_api_endpoints()
    generate_performance_metrics()
    generate_deployment_architecture()
    generate_model_pipeline()
    
    print("\n🎉 All visualizations generated successfully!")
    print("📁 Images saved to: /public/images/blog/")
    print("\nGenerated files:")
    print("- flask-ml-integration.jpg (cover image)")
    print("- flask-architecture.png")
    print("- flask-api-endpoints.png")
    print("- flask-performance.png")
    print("- flask-deployment.png")
    print("- ml-pipeline.png")
