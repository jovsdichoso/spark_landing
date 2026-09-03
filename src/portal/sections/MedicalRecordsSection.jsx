// portal/sections/MedicalRecordsSection.jsx

import React from 'react'

export default function MedicalRecordsSection({ record }) {
  if (!record) {
    return <p className="portal-empty">No medical record found.</p>
  }

  const categories = [
    {
      title: 'Personal Information',
      fields: [
        { label: 'Email', value: record.email },
        { label: 'Contact Number', value: record.contactNumber },
        { label: 'Caregiver Name', value: record.caregiverName },
        { label: 'Caregiver Number', value: record.caregiverNumber },
      ],
    },
    {
      title: 'Medical History',
      fields: [
        { label: 'Medical History Details', value: record.medicalHistory },
        { label: 'Hospital / Clinical Records', value: record.hospitalRecords },
      ],
    },
    {
      title: 'Diagnosis & Aphasia Level',
      fields: [
        { label: 'Aphasia Level', value: record.aphasiaLevel || 'Not Assessed' },
        { label: 'Stroke Recurrence', value: String(record.strokeRecurrence ?? '0') },
      ],
    },
  ]

  return (
    <div className="portal-stack">
      {categories.map((category) => (
        <section key={category.title} className="portal-panel">
          <h3>{category.title}</h3>
          <ul className="portal-kv">
            {category.fields.map((field) => (
              <li key={field.label}>
                <span>{field.label}</span>
                <strong>{field.value || 'N/A'}</strong>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="portal-footnote">
        This information is read-only here. To request a correction, please contact your
        Pathologist.
      </p>
    </div>
  )
}
