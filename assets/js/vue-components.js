/**
 * Vue 3 Components (Requirement: JS Framework for dynamic features)
 * Handles the Programs grid and dynamic data rendering.
 */

if (typeof Vue !== 'undefined' && document.getElementById('programs-app')) {
    const { createApp, ref, onMounted } = Vue;

    const ProgramsGrid = {
        template: `
            <div class="row g-4 justify-content-center">
                <div v-for="(prog, index) in programs" :key="index" class="col-md-6 col-lg-4 slide-in-up" :class="'delay-' + (index + 1)">
                    <div class="card h-100 border-0 shadow-sm program-card rounded-4 overflow-hidden">
                        <div class="program-img-wrapper position-relative">
                            <div class="position-absolute w-100 h-100 bg-dark opacity-10 overlay-bg z-index-1"></div>
                            <img :src="prog.image" :alt="prog.title" class="program-img w-100 h-100 object-fit-cover">
                        </div>
                        
                        <div class="card-body p-4 d-flex flex-column">
                            <div class="d-flex align-items-center mb-3">
                                <div class="bg-light rounded p-3 me-3 d-flex align-items-center justify-content-center" v-html="prog.icon"></div>
                                <div>
                                    <h4 class="card-title fw-bold font-heading mb-1">{{ prog.title }}</h4>
                                    <span class="badge bg-primary-subtle text-primary">{{ prog.age }}</span>
                                </div>
                            </div>
                            
                            <p class="card-text text-muted mb-4 flex-grow-1">{{ prog.desc }}</p>
                            
                            <ul class="list-unstyled mb-0 mt-auto">
                                <li v-for="(feat, j) in prog.features" :key="j" class="d-flex align-items-center mb-2 small fw-medium">
                                    <span class="d-inline-block bg-secondary rounded-circle me-2" style="width: 6px; height: 6px;"></span>
                                    {{ feat }}
                                </li>
                            </ul>
                        </div>
                        
                        <div class="card-footer bg-white border-top-0 p-4 pt-0 mt-auto">
                            <a href="contact.html" class="btn btn-outline-primary w-100 rounded-pill fw-medium">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
        `,
        setup() {
            const programs = ref([
                {
                    title: "1-on-1 Lessons",
                    icon: '<i class="fas fa-user text-primary fs-4"></i>',
                    age: "All Ages",
                    desc: "30, 45, or 60 minute piano lessons with one of our instructors. We understand that each student learns differently. No two students have the same curriculum.",
                    features: ["Customized curriculum", "Flexible pacing (30/45/60 min)", "Personalized attention"],
                    image: "images/IMG_2622.jpg"
                },
                {
                    title: "Semi-Private Lessons",
                    icon: '<i class="fas fa-users text-secondary fs-4"></i>',
                    age: "All Ages",
                    desc: "Grab a group of friends or family members to learn with and sign up for this economical alternative that is tons of fun!",
                    features: ["Collaborative learning", "Fun group environment", "Cost-effective option"],
                    image: "images/IMG_4778.JPG"
                },
                {
                    title: "Open Practice Times",
                    icon: '<i class="fas fa-clock text-info fs-4"></i>',
                    age: "Enrolled Students",
                    desc: "Designated times throughout the week for anyone to use our digital pianos. Perfect for families who have not committed to buying an instrument yet!",
                    features: ["Use studio digital pianos", "Flexible weekly schedule", "Great for beginners"],
                    image: "images/IMG_2639.jpg"
                },
                {
                    title: "Suzuki Violin Lessons",
                    icon: '<i class="fas fa-guitar text-primary fs-4"></i>',
                    age: "Ages 3 to Adult",
                    desc: "Children as young as 3 years old can learn to play the violin! Taught by a Suzuki Violin teacher with 25 years of experience teaching individual and group lessons.",
                    features: ["Ages 3 through Adult", "Individual & group lessons", "Experienced instruction"],
                    image: "images/IMG_4160.JPG"
                },
                {
                    title: "Adult Beginner Group Class",
                    icon: '<i class="fas fa-coffee text-secondary fs-4"></i>',
                    age: "Adults (18+)",
                    desc: "A relaxed, supportive group environment specifically designed for adults taking their first steps into playing the piano.",
                    features: ["Supportive environment", "Learn with peers", "Stress-free approach"],
                    image: "images/IMG_2631.jpg"
                }
            ]);

            onMounted(() => {
                // Re-trigger scroll observer for dynamically added Vue elements
                setTimeout(() => {
                    if(typeof initScrollAnimations === 'function') {
                        // We dispatch a custom event or scroll event to trigger the main.js observer
                        window.dispatchEvent(new Event('scroll'));
                        
                        // Fallback: manually add class to newly mounted vue elements if they are in viewport
                        document.querySelectorAll('#programs-app .slide-in-up').forEach(el => {
                            const rect = el.getBoundingClientRect();
                            if(rect.top < window.innerHeight) {
                                el.classList.add('is-visible');
                            }
                        });
                    }
                }, 100);
            });

            return { programs };
        }
    };

    const app = createApp({});
    app.component('programs-grid', ProgramsGrid);
    app.mount('#programs-app');
}