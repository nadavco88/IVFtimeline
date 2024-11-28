document.addEventListener('DOMContentLoaded', function() {
    const treatmentType = document.getElementById('treatmentType');
    const ivfSection = document.getElementById('ivfSection');
    const cosSection = document.getElementById('cosSection');
    const etSection = document.getElementById('etSection');

    // Treatment type change handler
    treatmentType.addEventListener('change', function() {
        // Hide all sections first
        [ivfSection, cosSection, etSection].forEach(section => {
            section.classList.add('hidden');
            section.innerHTML = ''; // Clear previous content
        });

        // Show and populate relevant section
        switch(this.value) {
            case 'IVF':
                populateIVFSection();
                break;
            case 'COS':
                populateCOSSection();
                break;
            case 'ET':
                populateETSection();
                break;
        }
    });

    function populateIVFSection() {
        ivfSection.classList.remove('hidden');
        ivfSection.innerHTML = `
            <h2>IVF Treatment Details</h2>
            <div class="form-group">
                <label for="gonadotropin">Gonadotropin:</label>
                <select id="gonadotropin" name="gonadotropin" required>
                    <option value="">Select Gonadotropin</option>
                    <option value="Gonal-F">Gonal-F</option>
                    <option value="Pergoveris">Pergoveris</option>
                    <option value="Menopur">Menopur</option>
                </select>
            </div>
            <div class="form-group">
                <label for="gnrhAntagonist">GnRH Antagonist:</label>
                <select id="gnrhAntagonist" name="gnrhAntagonist" required>
                    <option value="">Select GnRH Antagonist</option>
                    <option value="Cetrotide">Cetrotide</option>
                    <option value="Orgalutran">Orgalutran</option>
                </select>
            </div>
            <div class="form-group">
                <label for="ovulationTrigger">Ovulation Trigger:</label>
                <select id="ovulationTrigger" name="ovulationTrigger" required>
                    <option value="">Select Ovulation Trigger</option>
                    <option value="Decapeptyl">Decapeptyl</option>
                    <option value="Ovitrelle">Ovitrelle</option>
                    <option value="DualTrigger">Dual trigger</option>
                </select>
            </div>
            <div class="form-group">
                <label for="oocytePickupDate">Oocyte Pickup Date:</label>
                <input type="date" id="oocytePickupDate" name="oocytePickupDate" required>
            </div>
        `;
    }

    function populateCOSSection() {
        cosSection.classList.remove('hidden');
        cosSection.innerHTML = `
            <h2>COS Treatment Details</h2>
            <div class="form-group">
                <label for="stimulator">Stimulator:</label>
                <select id="stimulator" name="stimulator" required>
                    <option value="">Select Stimulator</option>
                    <option value="Letrozole">Letrozole</option>
                    <option value="Clomiphene">Clomiphene</option>
                    <option value="NaturalCycle">Natural cycle</option>
                </select>
            </div>
            <div class="form-group">
                <label for="cosOvulationTrigger">Ovulation Trigger:</label>
                <select id="cosOvulationTrigger" name="cosOvulationTrigger" required>
                    <option value="">Select Ovulation Trigger</option>
                    <option value="Decapeptyl">Decapeptyl</option>
                    <option value="Ovitrelle">Ovitrelle</option>
                    <option value="DualTrigger">Dual trigger</option>
                </select>
            </div>
            <div class="form-group">
                <label for="iuiDate">IUI Date:</label>
                <input type="date" id="iuiDate" name="iuiDate" required>
            </div>
        `;
    }

    function populateETSection() {
        etSection.classList.remove('hidden');
        etSection.innerHTML = `
            <h2>ET Treatment Details</h2>
            <div class="form-group">
                <label for="etType">Type of ET:</label>
                <select id="etType" name="etType" required>
                    <option value="">Select ET Type</option>
                    <option value="Fresh">Fresh</option>
                    <option value="Frozen">Frozen</option>
                </select>
            </div>
            <div class="form-group">
                <label for="endoPrep">Endometrial Preparation:</label>
                <select id="endoPrep" name="endoPrep" required onchange="handleEndoPrepChange(this.value)">
                    <option value="">Select Preparation</option>
                    <option value="HRT">HRT</option>
                    <option value="NaturalCycle">Natural cycle</option>
                </select>
            </div>
            <div id="hrtSection" class="hidden">
                <div class="form-group">
                    <label for="hormonalTreatment">Hormonal Treatment:</label>
                    <select id="hormonalTreatment" name="hormonalTreatment">
                        <option value="">Select Treatment</option>
                        <option value="Estrofem">Estrofem</option>
                        <option value="Duphastone">Duphastone</option>
                        <option value="Utrogestan">Utrogestan</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="embryoCount">Number of Embryos:</label>
                <select id="embryoCount" name="embryoCount" required>
                    <option value="">Select Count</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
            <div class="form-group">
                <label for="embryoDays">Embryo Days:</label>
                <select id="embryoDays" name="embryoDays" required>
                    <option value="">Select Days</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        `;
    }

    function handleEndoPrepChange(value) {
        const hrtSection = document.getElementById('hrtSection');
        if (value === 'HRT') {
            hrtSection.classList.remove('hidden');
        } else {
            hrtSection.classList.add('hidden');
        }
    }

    // Form submission handler
    document.getElementById('patientForm').addEventListener('submit', function(e) {
        e.preventDefault();
        generateTimeline();
    });

    function generateTimeline() {
        const timelineSection = document.getElementById('timelineSection');
        timelineSection.classList.remove('hidden');
        
        // Collect form data
        const formData = {
            patientName: document.getElementById('patientName').value,
            patientId: document.getElementById('patientId').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            lastMenstrualDate: document.getElementById('lastMenstrualDate').value,
            treatmentType: document.getElementById('treatmentType').value,
            // Additional fields based on treatment type
            ...collectTreatmentData()
        };

        // Call timeline generation function
        Timeline.create(formData);
    }

    function collectTreatmentData() {
        const treatmentType = document.getElementById('treatmentType').value;
        let data = {};

        switch(treatmentType) {
            case 'IVF':
                data = {
                    gonadotropin: document.getElementById('gonadotropin').value,
                    gnrhAntagonist: document.getElementById('gnrhAntagonist').value,
                    ovulationTrigger: document.getElementById('ovulationTrigger').value,
                    oocytePickupDate: document.getElementById('oocytePickupDate').value
                };
                break;
            case 'COS':
                data = {
                    stimulator: document.getElementById('stimulator').value,
                    ovulationTrigger: document.getElementById('cosOvulationTrigger').value,
                    iuiDate: document.getElementById('iuiDate').value
                };
                break;
            case 'ET':
                data = {
                    etType: document.getElementById('etType').value,
                    endoPrep: document.getElementById('endoPrep').value,
                    embryoCount: document.getElementById('embryoCount').value,
                    embryoDays: document.getElementById('embryoDays').value
                };
                if (document.getElementById('endoPrep').value === 'HRT') {
                    data.hormonalTreatment = document.getElementById('hormonalTreatment').value;
                }
                break;
        }
        return data;
    }
}); 