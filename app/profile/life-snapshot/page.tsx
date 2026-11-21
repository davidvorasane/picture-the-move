import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/profile/LogoutButton";

const priorities = [
  "Lower cost of living",
  "Affordable housing",
  "Higher earning potential",
  "Homeownership opportunity",
  "Career opportunities",
  "Strong job market",
  "Climate",
  "Walkability",
  "Public transportation",
  "Outdoor recreation",
  "Entertainment & nightlife",
  "City / urban lifestyle",
  "Being closer to family",
  "Slower / quieter lifestyle",
];

const dealbreakers = [
  "Housing must fit my budget",
  "Reasonable job opportunities for my occupation",
  "Commute cannot exceed my limit",
  "Must have public transportation",
  "Must be reasonably walkable",
  "Must have my preferred climate",
  "Must have access to outdoor recreation",
  "Must be urban",
  "Must be suburban",
  "Must be a smaller community",
  "Must be within reasonable distance of family",
  "Must have realistic homeownership options",
  "Overall cost of living must fit my budget",
];

const movingReasons = [
  "Lower my cost of living",
  "Find more affordable housing",
  "Become a homeowner",
  "Find better career opportunities",
  "Increase my income",
  "Improve my commute",
  "Find a climate I prefer",
  "Have better access to outdoor activities",
  "Move closer to family",
  "Improve my overall quality of life",
  "Find a community that better fits my lifestyle",
  "Make a fresh start / change of environment",
  "Other",
];

function ChoiceGrid({
  options,
  name,
  type,
}: {
  options: string[];
  name: string;
  type: "checkbox" | "radio";
}) {
  return (
    <div className="choice-grid">
      {options.map((option) => (
        <label className="choice" key={option}>
          <input
            type={type}
            name={name}
            value={option}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

function SectionHeading({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="snapshot-section-heading">
      <span className="snapshot-section-icon">
        {icon}
      </span>

      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default async function LifeSnapshotPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <main className="life-snapshot-page">
      <section className="life-snapshot-banner">
        <div className="life-snapshot-topbar">
          <Link
            href="/profile"
            className="life-snapshot-brand"
          >
            <Image
              src="/logo.png"
              alt="Picture the Move"
              width={56}
              height={56}
            />

            <span>Picture the Move</span>
          </Link>

          <LogoutButton />
        </div>
      </section>

      <section className="life-snapshot-content">
        <Link
          href="/profile"
          className="life-snapshot-back"
        >
          ← Back to Profile
        </Link>

        <div className="life-snapshot-intro">
          <div className="life-snapshot-intro-icon">
            📋
          </div>

          <h1>Build Your Life Snapshot</h1>

          <p>
            Tell us a little about your life today so
            Picture the Move can understand what
            matters when you compare cities.
          </p>
        </div>

        <form className="life-snapshot-form">
          {/* =========================
              Personal
              ========================= */}

          <section className="snapshot-section">
            <SectionHeading
              icon="👤"
              title="Personal"
              description="A few basics about you and your household situation."
            />

            <div className="field-grid">
              <div className="choice-block">
                <div className="choice-header">
                  <strong>Age Group</strong>
                </div>

                <ChoiceGrid
                  name="ageGroup"
                  type="radio"
                  options={[
                    "18–24",
                    "25–39",
                    "40–54",
                    "55–64",
                    "65+",
                  ]}
                />
              </div>

              <div className="choice-block">
                <div className="choice-header">
                  <strong>Gender</strong>
                </div>

                <ChoiceGrid
                  name="gender"
                  type="radio"
                  options={[
                    "Woman",
                    "Man",
                    "Non-binary",
                    "Prefer not to say",
                  ]}
                />
              </div>

              <div className="choice-block">
                <div className="choice-header">
                  <strong>Relationship Status</strong>
                </div>

                <ChoiceGrid
                  name="relationshipStatus"
                  type="radio"
                  options={[
                    "Single",
                    "Married",
                    "Partnered",
                    "Divorced",
                    "Widowed",
                    "Prefer not to say",
                  ]}
                />
              </div>
            </div>
          </section>

          {/* =========================
              Current City
              ========================= */}

          <section className="snapshot-section">
            <SectionHeading
              icon="📍"
              title="Current City"
              description="Where your life is based today."
            />

            <div className="field-grid field-grid-two">
              <label className="field">
                <span>City</span>

                <input
                  type="text"
                  name="currentCity"
                  placeholder="e.g. Las Vegas"
                />
              </label>

              <label className="field">
                <span>State</span>

                <input
                  type="text"
                  name="currentState"
                  placeholder="e.g. Nevada"
                />
              </label>
            </div>
          </section>

          {/* =========================
              Home & Family
              ========================= */}

          <section className="snapshot-section">
            <SectionHeading
              icon="🏠"
              title="Home & Family"
              description="Tell us about the people, pets, and housing situation that move with you."
            />

            <div className="field-grid field-grid-two">
              <div className="choice-block">
                <div className="choice-header">
                  <strong>Household Size</strong>
                </div>

                <ChoiceGrid
                  name="householdSize"
                  type="radio"
                  options={[
                    "1",
                    "2",
                    "3",
                    "4",
                    "5+",
                  ]}
                />
              </div>

              <div className="choice-block">
                <div className="choice-header">
                  <strong>Children</strong>
                </div>

                <ChoiceGrid
                  name="children"
                  type="radio"
                  options={[
                    "No children",
                    "1 child",
                    "2 children",
                    "3+ children",
                  ]}
                />
              </div>

              <div className="choice-block">
                <div className="choice-header">
                  <strong>Pets</strong>
                </div>

                <ChoiceGrid
                  name="pets"
                  type="radio"
                  options={[
                    "No pets",
                    "1 pet",
                    "2 pets",
                    "3+ pets",
                  ]}
                />
              </div>

              <div className="choice-block">
                <div className="choice-header">
                  <strong>
                    Current Housing Situation
                  </strong>
                </div>

                <ChoiceGrid
                  name="housingSituation"
                  type="radio"
                  options={[
                    "Renting",
                    "Own with mortgage",
                    "Own without mortgage",
                    "Living with family/friends",
                    "Other",
                  ]}
                />
              </div>

              <label className="field">
                <span>Monthly Housing Cost</span>

                <div className="input-with-prefix">
                  <span>$</span>

                  <input
                    type="number"
                    name="monthlyHousingCost"
                    min="0"
                    step="100"
                    placeholder="e.g. 1800"
                  />
                </div>
              </label>

              <div className="choice-block">
                <div className="choice-header">
                  <strong>Current Bedrooms</strong>
                </div>

                <ChoiceGrid
                  name="currentBedrooms"
                  type="radio"
                  options={[
                    "Studio",
                    "1",
                    "2",
                    "3",
                    "4+",
                  ]}
                />
              </div>
            </div>
          </section>

          {/* =========================
              Work & Income
              ========================= */}

          <section className="snapshot-section">
            <SectionHeading
              icon="💼"
              title="Work & Income"
              description="Your current earning situation and what could change if you move."
            />

            <div className="field-grid field-grid-two">
              <div className="choice-block">
                <div className="choice-header">
                  <strong>Employment Status</strong>
                </div>

                <ChoiceGrid
                  name="employmentStatus"
                  type="radio"
                  options={[
                    "Full-time",
                    "Part-time",
                    "Self-employed",
                    "Unemployed",
                    "Student",
                    "Retired",
                    "Other",
                  ]}
                />
              </div>

              <label className="field">
                <span>Occupation</span>

                <input
                  type="text"
                  name="occupation"
                  placeholder="e.g. Software Developer"
                />
              </label>

              <div className="choice-block">
                <div className="choice-header">
                  <strong>Industry</strong>
                </div>

                <ChoiceGrid
                  name="industry"
                  type="radio"
                  options={[
                    "Technology",
                    "Healthcare",
                    "Education",
                    "Finance & Banking",
                    "Government",
                    "Manufacturing",
                    "Construction",
                    "Retail",
                    "Hospitality",
                    "Transportation",
                    "Professional Services",
                    "Other",
                  ]}
                />
              </div>

              <label className="field">
                <span>Personal Annual Income</span>

                <div className="input-with-prefix">
                  <span>$</span>

                  <input
                    type="number"
                    name="annualIncome"
                    min="0"
                    step="1000"
                    placeholder="e.g. 65000"
                  />
                </div>
              </label>

              <label className="field">
                <span>
                  Other Household Income{" "}
                  <em>Optional</em>
                </span>

                <div className="input-with-prefix">
                  <span>$</span>

                  <input
                    type="number"
                    name="otherHouseholdIncome"
                    min="0"
                    step="1000"
                    placeholder="e.g. 30000"
                  />
                </div>
              </label>

              <div className="choice-block">
                <div className="choice-header">
                  <strong>
                    What happens to your current job if
                    you move?
                  </strong>
                </div>

                <ChoiceGrid
                  name="jobAfterMove"
                  type="radio"
                  options={[
                    "I can keep my current job",
                    "I would need to find a new job",
                    "I am already looking for a new job",
                    "I'm not sure",
                  ]}
                />
              </div>
            </div>
          </section>

          {/* =========================
              Transportation
              ========================= */}

          <section className="snapshot-section">
            <SectionHeading
              icon="🚗"
              title="Transportation & Commute"
              description="How you get around today and how much your commute affects your life."
            />

            <div className="field-grid field-grid-two">
              <div className="choice-block">
                <div className="choice-header">
                  <strong>Primary Transportation</strong>
                </div>

                <ChoiceGrid
                  name="primaryTransportation"
                  type="radio"
                  options={[
                    "Drive alone",
                    "Carpool",
                    "Public transportation",
                    "Walk",
                    "Bike",
                    "Work from home",
                    "Other",
                  ]}
                />
              </div>

              <div className="choice-block">
                <div className="choice-header">
                  <strong>One-way Commute</strong>
                </div>

                <ChoiceGrid
                  name="commuteTime"
                  type="radio"
                  options={[
                    "0–10 minutes",
                    "11–20 minutes",
                    "21–30 minutes",
                    "31–45 minutes",
                    "46–60 minutes",
                    "60+ minutes",
                  ]}
                />
              </div>

              <div className="choice-block">
                <div className="choice-header">
                  <strong>Commute Days per Week</strong>
                </div>

                <ChoiceGrid
                  name="commuteDays"
                  type="radio"
                  options={[
                    "0",
                    "1",
                    "2",
                    "3",
                    "4",
                    "5+",
                  ]}
                />
              </div>

              <div className="choice-block">
                <div className="choice-header">
                  <strong>Household Vehicles</strong>
                </div>

                <ChoiceGrid
                  name="householdVehicles"
                  type="radio"
                  options={[
                    "0",
                    "1",
                    "2",
                    "3+",
                  ]}
                />
              </div>

              <label className="field">
                <span>
                  Monthly Transportation Cost
                </span>

                <div className="input-with-prefix">
                  <span>$</span>

                  <input
                    type="number"
                    name="monthlyTransportationCost"
                    min="0"
                    step="25"
                    placeholder="e.g. 450"
                  />
                </div>
              </label>
            </div>
          </section>

          {/* =========================
              Lifestyle & Priorities
              ========================= */}

          <section className="snapshot-section">
            <SectionHeading
              icon="❤️"
              title="Lifestyle & Priorities"
              description="The environment, amenities, and trade-offs that shape where you feel at home."
            />

            <div className="field-grid">
              <div className="choice-block">
                <div className="choice-header">
                  <strong>Community Type</strong>

                  <span>
                    Choose the type of place that feels
                    most like home.
                  </span>
                </div>

                <ChoiceGrid
                  name="communityType"
                  type="radio"
                  options={[
                    "Urban / City",
                    "Suburban",
                    "Small City / Town",
                    "Rural",
                    "No strong preference",
                  ]}
                />
              </div>

              <div className="choice-block">
                <div className="choice-header">
                  <strong>Climate Preference</strong>
                </div>

                <ChoiceGrid
                  name="climatePreference"
                  type="radio"
                  options={[
                    "Warm weather",
                    "Mild weather",
                    "Four distinct seasons",
                    "Cooler weather",
                    "No strong preference",
                  ]}
                />
              </div>

              <div className="choice-block">
                <div className="choice-header">
                  <strong>Top Priorities</strong>

                  <span>Choose up to 5.</span>
                </div>

                <ChoiceGrid
                  name="priorities"
                  type="checkbox"
                  options={priorities}
                />
              </div>

              <div className="choice-block">
                <div className="choice-header">
                  <strong>Dealbreakers</strong>

                  <span>
                    Select anything that could rule out a
                    city for you.
                  </span>
                </div>

                <ChoiceGrid
                  name="dealbreakers"
                  type="checkbox"
                  options={dealbreakers}
                />
              </div>
            </div>
          </section>

          {/* =========================
              Moving Goals
              ========================= */}

          <section className="snapshot-section">
            <SectionHeading
              icon="🎯"
              title="Moving Goals"
              description="What you want your next chapter to improve or change."
            />

            <div className="field-grid">
              <div className="choice-block">
                <div className="choice-header">
                  <strong>
                    Primary Reason for Moving
                  </strong>

                  <span>Choose one.</span>
                </div>

                <ChoiceGrid
                  name="primaryMovingReason"
                  type="radio"
                  options={movingReasons}
                />
              </div>

              <div className="choice-block">
                <div className="choice-header">
                  <strong>Other Reasons</strong>

                  <span>Choose up to 3.</span>
                </div>

                <ChoiceGrid
                  name="otherMovingReasons"
                  type="checkbox"
                  options={movingReasons.filter(
                    (reason) => reason !== "Other"
                  )}
                />
              </div>

              <label className="field optional-field">
                <span>
                  Other Reason <em>Optional</em>
                </span>

                <input
                  type="text"
                  name="otherMovingReason"
                  placeholder="Tell us anything else that matters to your move"
                />
              </label>

              <div className="field-grid field-grid-two nested-field-grid">
                <div className="choice-block">
                  <div className="choice-header">
                    <strong>Moving Timeline</strong>
                  </div>

                  <ChoiceGrid
                    name="movingTimeline"
                    type="radio"
                    options={[
                      "Within 3 months",
                      "3–6 months",
                      "6–12 months",
                      "1–2 years",
                      "More than 2 years",
                      "Just exploring",
                    ]}
                  />
                </div>

                <div className="choice-block">
                  <div className="choice-header">
                    <strong>Housing Goal</strong>
                  </div>

                  <ChoiceGrid
                    name="housingGoal"
                    type="radio"
                    options={[
                      "Rent",
                      "Buy",
                      "Either",
                      "Not sure",
                    ]}
                  />
                </div>

                <div className="choice-block">
                  <div className="choice-header">
                    <strong>Desired Bedrooms</strong>
                  </div>

                  <ChoiceGrid
                    name="desiredBedrooms"
                    type="radio"
                    options={[
                      "Studio",
                      "1 bedroom",
                      "2 bedrooms",
                      "3 bedrooms",
                      "4+ bedrooms",
                    ]}
                  />
                </div>

                <label className="field">
                  <span>
                    Maximum Monthly Housing Budget
                  </span>

                  <div className="input-with-prefix">
                    <span>$</span>

                    <input
                      type="number"
                      name="maximumHousingBudget"
                      min="0"
                      step="100"
                      placeholder="e.g. 2000"
                    />
                  </div>
                </label>

                <div className="choice-block">
                  <div className="choice-header">
                    <strong>
                      Savings for Potential Move
                    </strong>
                  </div>

                  <ChoiceGrid
                    name="movingSavings"
                    type="radio"
                    options={[
                      "Less than $1,000",
                      "$1,000–$4,999",
                      "$5,000–$9,999",
                      "$10,000–$24,999",
                      "$25,000–$49,999",
                      "$50,000+",
                    ]}
                  />
                </div>

                <label className="field">
                  <span>Minimum Annual Income</span>

                  <div className="input-with-prefix">
                    <span>$</span>

                    <input
                      type="number"
                      name="minimumAnnualIncome"
                      min="0"
                      step="1000"
                      placeholder="e.g. 70000"
                    />
                  </div>
                </label>

                <div className="choice-block">
                  <div className="choice-header">
                    <strong>
                      Maximum Acceptable Commute
                    </strong>
                  </div>

                  <ChoiceGrid
                    name="maximumCommute"
                    type="radio"
                    options={[
                      "15 minutes",
                      "30 minutes",
                      "45 minutes",
                      "60 minutes",
                      "No preference",
                    ]}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* =========================
              Form Actions
              ========================= */}

          <div className="life-snapshot-form-footer">
            <Link
              href="/profile"
              className="cancel-button"
            >
              Cancel
            </Link>

            <button
              type="button"
              className="save-button"
            >
              Save Life Snapshot →
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}