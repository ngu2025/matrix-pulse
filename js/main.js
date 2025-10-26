// Enhanced Matrix Pulse Dashboard - English Version
class MatrixPulseDashboard {
    constructor() {
        this.metrics = {};
        this.isSubscribed = false;
        this.currentTimeframe = 'realtime';
        this.subscriptionFrequency = 'monthly';
        this.init();
    }

    init() {
        this.checkSubscription();
        this.bindEvents();
        this.loadDemoMetrics();
        this.startAutoUpdates();
        this.updateSubscriptionUI();
    }

    checkSubscription() {
        // In production: Check user subscription status via API
        // For demo, we'll show subscription plans
        this.isSubscribed = false;
    }

    bindEvents() {
        // Timeframe selection
        const timeframeSelect = document.getElementById('timeframe-select');
        if (timeframeSelect) {
            timeframeSelect.addEventListener('change', (e) => {
                this.updateTimeframe(e.target.value);
            });
        }
    }

    updateSubscriptionUI() {
        const accessBadge = document.querySelector('.access-badge');
        const demoElements = document.querySelectorAll('.metric-card.live');
        
        if (this.isSubscribed) {
            // Subscribed mode
            if (accessBadge) {
                accessBadge.innerHTML = `
                    <span class="badge-icon">✅</span>
                    <span>Full Access - ${this.getFrequencyText(this.subscriptionFrequency)} Plan</span>
                `;
                accessBadge.style.background = 'rgba(16, 185, 129, 0.1)';
                accessBadge.style.borderColor = '#10b981';
            }
            
            demoElements.forEach(card => {
                card.style.opacity = '1';
                card.classList.add('subscribed');
            });
            
            // Show all recommendations
            this.updateStrategicRecommendations();
        } else {
            // Demo mode
            if (accessBadge) {
                accessBadge.innerHTML = `
                    <span class="badge-icon">👁️</span>
                    <span>Demo Mode - Subscribe for full access</span>
                `;
            }
            
            demoElements.forEach(card => {
                card.style.opacity = '0.8';
                card.classList.remove('subscribed');
            });
        }
    }

    getFrequencyText(frequency) {
        const frequencyMap = {
            'daily': 'Daily Intelligence',
            'weekly': 'Weekly Insights',
            'biweekly': 'Bi-weekly Analysis',
            'monthly': 'Monthly Strategic'
        };
        return frequencyMap[frequency] || 'Monthly Strategic';
    }

    loadDemoMetrics() {
        // Load initial demo data
        this.metrics = {
            marketOverview: {
                size: '$402.5B',
                growth: '+8.7% YoY',
                trend: 'positive',
                segments: {
                    corporate: '$186.3B',
                    education: '$124.8B',
                    government: '$91.4B'
                }
            },
            competitors: [
                { name: 'Coursera', share: '18.3%', trend: 'up', change: '+2.1%' },
                { name: 'LinkedIn Learning', share: '15.7%', trend: 'neutral', change: '+0.5%' },
                { name: 'Udemy', share: '12.4%', trend: 'down', change: '-1.2%' },
                { name: 'Docebo', share: '5.6%', trend: 'up', change: '+3.4%' },
                { name: '360Learning', share: '4.2%', trend: 'up', change: '+0.8%' }
            ],
            customerInsights: {
                enterprise: '42%',
                smb: '35%',
                education: '23%',
                trends: {
                    mobile_adoption: '+28%',
                    ai_integration: '+45%',
                    personalized_learning: '+32%'
                }
            },
            recommendations: [
                'Expand SME segment with tiered pricing models',
                'Develop AI-powered personalized learning paths',
                'Strengthen partnerships with HR tech platforms',
                'Focus on emerging markets in Asia-Pacific region',
                'Enhance mobile learning experience capabilities',
                'Implement predictive analytics for customer retention',
                'Develop industry-specific certification programs'
            ]
        };

        this.updateAllMetrics();
    }

    updateAllMetrics() {
        this.updateMarketOverview();
        this.updateCompetitiveLandscape();
        this.updateCustomerInsights();
        this.updateStrategicRecommendations();
    }

    updateStrategicRecommendations() {
        const recommendations = this.metrics.recommendations;
        const listElement = document.getElementById('recommendations-list');
        
        if (listElement) {
            if (this.isSubscribed) {
                // Show all recommendations for subscribed users
                listElement.innerHTML = recommendations.map(rec => `
                    <div class="recommendation-item">
                        <span class="recommendation-icon">💡</span>
                        <span class="recommendation-text">${rec}</span>
                    </div>
                `).join('');
            } else {
                // Show limited recommendations for demo
                const displayRecommendations = recommendations.slice(0, 2);
                listElement.innerHTML = displayRecommendations.map(rec => `
                    <div class="recommendation-item">
                        <span class="recommendation-icon">💡</span>
                        <span class="recommendation-text">${rec}</span>
                    </div>
                `).join('');
                
                // Add subscription prompt
                listElement.innerHTML += `
                    <div class="recommendation-item" style="background: rgba(0, 220, 130, 0.1); border-color: var(--matrix-accent);">
                        <span class="recommendation-icon">🔒</span>
                        <span class="recommendation-text">
                            <strong>Subscribe to unlock all ${recommendations.length} strategic recommendations</strong>
                        </span>
                    </div>
                `;
            }
        }
    }

    updateMarketOverview() {
        const data = this.metrics.marketOverview;
        this.updateMetricElement('market-size', data.size);
        this.updateMetricElement('market-trend', data.growth);
    }

    updateCompetitiveLandscape() {
        // Already populated in HTML for demo
    }

    updateCustomerInsights() {
        // Already populated in HTML for demo
    }

    updateMetricElement(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value;
        }
    }

    startAutoUpdates() {
        // Auto-refresh simulation
        setInterval(() => {
            if (this.isSubscribed) {
                this.simulateLiveUpdate();
            }
        }, 30000);
    }

    simulateLiveUpdate() {
        // Simulate data updates for subscribed users
        console.log('Live data update simulated');
    }

    refreshMetrics() {
        this.showNotification('Refreshing market data...');
        setTimeout(() => {
            this.loadDemoMetrics();
            this.showNotification('Data refreshed successfully');
        }, 1500);
    }

    updateTimeframe(timeframe) {
        this.currentTimeframe = timeframe;
        this.showNotification(`Timeframe updated to: ${timeframe}`);
        setTimeout(() => {
            this.loadDemoMetrics();
        }, 1000);
    }

    activateSubscription(frequency) {
        // Redirect to main landing for payment with frequency pre-selected
        const landingUrl = `https://ngu2025.github.io/landing-ai-solutions/#pricing`;
        window.open(landingUrl, '_blank');
        
        this.showNotification(`Redirecting to activate ${this.getFrequencyText(frequency)} plan`);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--matrix-accent);
            color: var(--matrix-bg);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            font-weight: 600;
            max-width: 300px;
            word-wrap: break-word;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.matrixPulse = new MatrixPulseDashboard();
});

// Global functions
function refreshMetrics() {
    if (window.matrixPulse) {
        window.matrixPulse.refreshMetrics();
    }
}

function activateSubscription(frequency) {
    if (window.matrixPulse) {
        window.matrixPulse.activateSubscription(frequency);
    }
}