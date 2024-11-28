const Timeline = {
    create: function(data) {
        const timelineDisplay = document.getElementById('timelineDisplay');
        const startDate = new Date(data.lastMenstrualDate);
        
        // Create timeline container
        const timeline = document.createElement('div');
        timeline.className = 'timeline-container';
        
        // Create timeline line
        const line = document.createElement('div');
        line.className = 'timeline-line';
        
        // Add events based on treatment type
        const events = this.generateEvents(data, startDate);
        
        // Create timeline HTML
        let timelineHTML = `
            <div class="timeline-wrapper">
                <div class="timeline-line"></div>
                ${events.map(event => `
                    <div class="timeline-event" style="left: ${event.position}%">
                        <div class="event-marker"></div>
                        <div class="event-label">${event.label}</div>
                        <div class="event-date">${event.date}</div>
                        <div class="event-day">Day ${event.day}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        timelineDisplay.innerHTML = timelineHTML;
    },

    generateEvents: function(data, startDate) {
        let events = [{
            label: 'Last Menstrual Date',
            date: this.formatDate(startDate),
            day: 1,
            position: 0
        }];

        switch(data.treatmentType) {
            case 'IVF':
                events = events.concat(this.generateIVFEvents(data, startDate));
                break;
            case 'COS':
                events = events.concat(this.generateCOSEvents(data, startDate));
                break;
            case 'ET':
                events = events.concat(this.generateETEvents(data, startDate));
                break;
        }

        return events;
    },

    formatDate: function(date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    calculateDayDifference: function(startDate, endDate) {
        return Math.floor((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
    }
}; 