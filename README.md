# ShambaAssist 🌱

> AI-powered crop disease detection and soil health monitoring for smallholder farmers in Kenya.

ShambaAssist combines IoT sensor data with machine learning image analysis to give farmers early warnings, actionable insights, and practical recommendations — designed from the ground up for low-bandwidth environments.

---

## The problem

Smallholder farmers in Kenya lose significant yields every season to crop diseases and poor soil health monitoring. Existing tools are either too expensive, require reliable internet, or aren't trained on East African crop varieties. ShambaAssist is built specifically for this gap.

---

## How it works

A farmer is onboarded by an agronomist who sets up sensors on their plot. Based on farm size, a combination of real ESP32 sensors and simulated sensors cover the field. Sensor data flows through an MQTT pipeline to the backend, where it is combined with crop images uploaded by the farmer or agronomist. The AI layer fuses both data sources to generate a diagnosis and recommendation, which is pushed to the farmer's dashboard and delivered via SMS for areas with no internet.

Farmers who want in-person support can request a physical visit from their assigned agronomist directly through the app.

---

## Features

- **Sensor fusion** — soil moisture, NPK, temperature and humidity combined into a unified crop health score
- **Crop image analysis** — ML model trained on East African crop varieties detects leaf disease, root conditions and fruit ripening
- **Hybrid IoT deployment** — real ESP32 sensors anchored by Wokwi-simulated sensors to cover larger plots affordably
- **SMS alerts** — critical warnings delivered via Africa's Talking API for low-bandwidth areas
- **Agronomist dashboard** — manage assigned farmers, review diagnoses, monitor sensor health, handle visit requests
- **Farmer dashboard** — view crop health, sensor readings, AI recommendations and nearby agronomists
- **Visit request system** — farmers can request physical farm visits from their assigned agronomist

---

## Hybrid IoT approach

Most smallholder farmers cannot afford to deploy sensors across their entire plot. ShambaAssist uses a hybrid model:

| Farm size | Real sensors | Simulated sensors |
|-----------|-------------|-------------------|
| Under 1 acre | 1 | 0 |
| 1–5 acres | 1 | 2–3 |
| 5+ acres | 2–3 | 4–6 |

One real ESP32 sensor acts as the ground truth anchor. Simulated sensors extrapolate readings across the rest of the farm. The agronomist sets this up during onboarding — the farmer does not choose.

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, React, Tailwind CSS |
| Backend | Spring Boot, Prisma, MariaDB |
| Machine learning | TensorFlow / PyTorch |
| IoT | ESP32, Wokwi simulator, MQTT |
| SMS | Africa's Talking API |
| Cloud | AWS / GCP |

---

## Project structure
shamba-assist/
├── frontend/         # Next.js app (landing, auth, dashboards)
├── backend/          # Spring Boot REST API
├── ml/               # Image classification models
├── iot/              # ESP32 firmware + Wokwi simulation
└── docs/             # Architecture diagrams, research notes

---

## Pages built so far

- `/` — Landing page
- `/auth` — Sign in / Create account (farmer & agronomist)
- `/dashboard/admin` — Agronomist dashboard
- `/dashboard/farmer` — Farmer dashboard *(in progress)*

---

## Local setup

```bash
# Clone the repo
git clone https://github.com/NamadaIsabelle/shamba-assist.git
cd shamba-assist

# Install frontend dependencies
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000`

---

## Status

This project is in active development. Contributions and feedback are welcome.

---

*Built with Isabela Risper Namada for Kenyan farmers*
