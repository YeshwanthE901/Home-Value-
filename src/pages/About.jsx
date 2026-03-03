export default function About() {
    return (
        <div className="page about-page">
            <div className="page-hero page-hero--sm">
                <h1>About HomeValue+</h1>
                <p>Empowering Indian homeowners with smart upgrade intelligence</p>
            </div>

            <section className="section">
                <div className="about-grid">
                    <div className="about-text">
                        <h2>Our Mission</h2>
                        <p>
                            HomeValue+ was created to bridge the gap between homeowners and
                            the trusted knowledge they need to make smart property
                            improvement decisions. We focus on the Indian middle-class
                            housing market — apartments and independent homes across tier-1
                            and tier-2 cities.
                        </p>
                        <p>
                            Our platform analyses your property details and connects you
                            with targeted upgrade recommendations that give the best return
                            on investment.
                        </p>
                    </div>

                    <div className="about-cards">
                        {[
                            { icon: '🎯', title: 'Personalised', desc: 'Recommendations tailored to your budget, property type, and condition.' },
                            { icon: '🇮🇳', title: 'India-First', desc: 'Costs, trends, and suggestions built specifically for the Indian market.' },
                            { icon: '💸', title: 'Affordable', desc: 'We cover upgrades from ₹25K to ₹8L — something for every budget.' },
                            { icon: '📊', title: 'Data-Driven', desc: 'Value increase estimates based on real Indian real estate trends.' },
                        ].map((item) => (
                            <div className="about-card" key={item.title}>
                                <span>{item.icon}</span>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section section--grey">
                <div className="section-header">
                    <h2>Our Team</h2>
                    <p>Passionate about making smart property decisions accessible</p>
                </div>
                <div className="team-grid">
                    {[
                        { name: 'Priya Nair', role: 'Founder & CEO', emoji: '👩‍💼' },
                        { name: 'Arjun Mehta', role: 'Head of Data', emoji: '👨‍💻' },
                        { name: 'Sunita Rao', role: 'Renovation Expert', emoji: '👷‍♀️' },
                    ].map((member) => (
                        <div className="team-card" key={member.name}>
                            <div className="team-avatar">{member.emoji}</div>
                            <h3>{member.name}</h3>
                            <p>{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
