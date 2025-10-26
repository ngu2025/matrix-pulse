// Matrix Pulse - Main Dashboard Controller
class MatrixPulseDashboard {
    constructor() {
        this.metrics = {};
        this.isSubscribed = false;
        this.currentTimeframe = 'realtime';
        this.init();
    }

    init() {
        this.checkSubscription();
        this.bindEvents();
        this.loadDemoMetrics();
        this.startAutoUpdates();
    }

    checkSubscription() {
        // In production: Check user subscription status via API
        // For demo purposes, we'll simulate both states
        this.isSubscribed = false; // Change to true to test subscribed state
        this.updateAccessUI();
    }

    bindEvents() {
        // Timeframe selection
        const timeframeSelect = document.getElementById('timeframe-select');
        if (timeframeSelect) {
            timeframeSelect.addEventListener('change', (e) => {
                this.updateTimeframe(e.target.value);
            });
        }

        // Subscription activation
        document.querySelectorAll('.pricing-option button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const plan = e.target.closest('.pricing-option').querySelector('h4').textContent;
                this.activateSubscription(plan);
            });
        });
    }

    updateAccessUI() {
        const accessBadge = document.querySelector('.access-badge');
        const demoElements = document.querySelectorAll('.metric-card.live');
        
        if (!this.isSubscribed) {
            // Demo mode - show limited functionality
            if (accessBadge) {
                accessBadge.innerHTML = `
                    <span class="badge-icon">👁️</span>
                    <span>Demo Mode - Limited functionality</span>
                `;
            }
            
            // Add overlay to metrics
            demoElements.forEach(card => {
                card.style.opacity = '0.8';
                card.style.position = 'relative';
            });
        } else {
            // Subscribed mode - full access
            if (accessBadge) {
                accessBadge.innerHTML = `
                    <span class="badge-icon">✅</span>
                    <span>Full Access - Active Subscription</span>
                `;
            }
            
            demoElements.forEach(card => {
                card.style.opacity = '1';
            });
        }
    }

    loadDemoMetrics() {
        // Simulate API data loading
        setTimeout(() => {
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
                    'Enhance mobile learning experience capabilities'
                ]
            };

            this.updateAllMetrics();
            this.showNotification('Live metrics loaded successfully');
        }, 1500);
    }

    updateAllMetrics() {
        this.updateMarketOverview();
        this.updateCompetitiveLandscape();
        this.updateCustomerInsights();
        this.updateStrategicRecommendations();
    }

    updateMarketOverview() {
        const data = this.metrics.marketOverview;
        
        this.updateMetricElement('market-size', data.size);
        this.updateMetricElement('market-trend', data.growth);
        
        // Update market chart visualization
        const chartElement = document.getElementById('market-chart');
        if (chartElement) {
            chartElement.innerHTML = `
                <div style="text-align: center; padding: 1rem;">
                    <div style="font-size: 0.8rem; opacity: 0.8; margin-bottom: 1rem;">Market Segments</div>
                    <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 0.5rem; flex-wrap: wrap;">
                        <div style="text-align: center;">
                            <div style="font-weight: bold; color: #00dc82; font-size: 0.9rem;">Corporate</div>
                            <div style="font-size: 0.8rem;">${data.segments.corporate}</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-weight: bold; color: #00b4ff; font-size: 0.9rem;">Education</div>
                            <div style="font-size: 0.8rem;">${data.segments.education}</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-weight: bold; color: #8b5cf6; font-size: 0.9rem;">Government</div>
                            <div style="font-size: 0.8rem;">${data.segments.government}</div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    updateCompetitiveLandscape() {
        const competitors = this.metrics.competitors;
        const listElement = document.getElementById('competitor-list');
        
        if (listElement) {
            listElement.innerHTML = competitors.map(comp => `
                <div class="competitor-item">
                    <span class="competitor-name">${comp.name}</span>
                    <span class="competitor-share">${comp.share}</span>
                    <span class="competitor-trend ${comp.trend}">
                        ${comp.change}
                    </span>
                </div>
            `).join('');
        }
    }

    updateCustomerInsights() {
        const insights = this.metrics.customerInsights;
        const chartElement = document.getElementById('segmentation-chart');
        
        if (chartElement) {
            chartElement.innerHTML = `
                <div style="text-align: center; padding: 1rem;">
                    <div style="font-size: 0.8rem; opacity: 0.8; margin-bottom: 1rem;">Customer Segmentation</div>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 0.9rem;">Enterprise</span>
                            <span style="color: #00dc82; font-weight: bold; font-size: 0.9rem;">${insights.enterprise}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 0.9rem;">SMB</span>
                            <span style="color: #00b4ff; font-weight: bold; font-size: 0.9rem;">${insights.smb}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 0.9rem;">Education</span>
                            <span style="color: #8b5cf6; font-weight: bold; font-size: 0.9rem;">${insights.education}</span>
                        </div>
                    </div>
                    ${this.isSubscribed ? `
                    <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--matrix-border);">
                        <div style="font-size: 0.7rem; opacity: 0.8; margin-bottom: 0.5rem;">Growth Trends</div>
                        <div style="display: flex; justify-content: space-around; font-size: 0.8rem;">
                            <span style="color: #00dc82;">Mobile: ${insights.trends.mobile_adoption}</span>
                            <span style="color: #00b4ff;">AI: ${insights.trends.ai_integration}</span>
                        </div>
                    </div>
                    ` : ''}
                </div>
            `;
        }
    }

    updateStrategicRecommendations() {
        const recommendations = this.metrics.recommendations;
        const listElement = document.getElementById('recommendations-list');
        
        if (listElement) {
            // Show only 2 recommendations in demo mode, all in subscribed mode
            const displayRecommendations = this.isSubscribed ? recommendations : recommendations.slice(0, 2);
            
            listElement.innerHTML = displayRecommendations.map(rec => `
                <div class="recommendation-item">
                    <span class="recommendation-icon">💡</span>
                    <span class="recommendation-text">${rec}</span>
                </div>
            `).join('');
            
            if (!this.isSubscribed && recommendations.length > 2) {
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

    updateMetricElement(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            // Add update animation
            element.style.opacity = '0.5';
            setTimeout(() => {
                element.textContent = value;
                element.style.opacity = '1';
            }, 300);
        }
    }

    startAutoUpdates() {
        // Simulate real-time updates every 30 seconds
        setInterval(() => {
            if (this.isSubscribed) {
                this.simulateLiveUpdate();
            }
        }, 30000);
    }

    simulateLiveUpdate() {
        // Simulate small data fluctuations for demo
        const randomCompetitor = Math.floor(Math.random() * this.metrics.competitors.length);
        const changes = ['+0.1%', '+0.2%', '-0.1%', '+0.3%'];
        const randomChange = changes[Math.floor(Math.random() * changes.length)];
        
        this.metrics.competitors[randomCompetitor].change = randomChange;
        
        this.updateCompetitiveLandscape();
        this.showNotification('Market data updated automatically');
    }

    refreshMetrics() {
        this.showNotification('Refreshing market data...');
        
        // Add loading state
        document.querySelectorAll('.metric-value').forEach(el => {
            el.textContent = 'Loading...';
        });
        
        // Simulate API call
        setTimeout(() => {
            this.loadDemoMetrics();
            this.showNotification('Data refreshed successfully');
        }, 1500);
    }

    updateTimeframe(timeframe) {
        this.currentTimeframe = timeframe;
        this.showNotification(`Timeframe updated to: ${timeframe}`);
        
        // Simulate loading data for selected timeframe
        setTimeout(() => {
            this.loadDemoMetrics();
        }, 1000);
    }

    activateSubscription(plan) {
        if (!this.isSubscribed) {
            // Redirect to main landing for payment
            window.open('https://ngu2025.github.io/landing-ai-solutions/', '_blank');
            this.showNotification('Please complete analysis purchase first to activate monitoring');
        } else {
            this.showNotification(`Subscription activated: ${plan} plan`);
            // In production: Make API call to activate subscription
        }
    }

    showNotification(message) {
        // Create notification element
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
        
        // Remove after 5 seconds
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

// Global functions for HTML onclick handlers
function refreshMetrics() {
    if (window.matrixPulse) {
        window.matrixPulse.refreshMetrics();
    }
}

function activateSubscription(plan) {
    if (window.matrixPulse) {
        window.matrixPulse.activateSubscription(plan);
    }
}