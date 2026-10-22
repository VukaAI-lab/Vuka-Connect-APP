// DEMO ONLY: sample data. No network calls, no real service links.
const services = [
  { id: 'it-support', name: 'IT Support', category: 'Support', access: 'Microsoft sign-in', description: 'Log hardware and software queries, and request or borrow IT equipment.', icon: 'M3 5h18v11H3zM8 20h8M12 16v4', href: '#demo' },
  { id: 'hr-tickets', name: 'HR Tickets', category: 'People', access: 'Microsoft sign-in', description: 'Raise HR queries, requests or issues so the team can track and resolve them.', icon: 'M16 8a4 4 0 1 0-8 0 4 4 0 0 0 8 0zM4 21c0-4 3.6-6 8-6s8 2 8 6', href: '#demo' },
  { id: 'dynamics-payroll', name: 'Dynamics Payroll', category: 'People', access: 'Single sign-on', description: 'Apply for leave, check your balance and manage your employee details.', icon: 'M3 7h17a1 1 0 0 1 1 1v11H4a1 1 0 0 1-1-1zM3 7l13-3v3M16 13h3', href: '#demo' },
  { id: 'vuka-website', name: 'VUKA Website', category: 'Company', access: 'Public site', description: 'Our portfolio, events calendar, careers and success stories.', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18', href: 'https://wearevuka.com' },
  { id: 'vuka-pulse', name: 'VUKA Pulse', category: 'Company', access: 'Microsoft sign-in', description: 'News, our purpose and mission, and what is happening across VUKA Group.', icon: 'M3 12h4l3-8 4 16 3-8h4', href: '#demo' },
  { id: 'upskilling', name: 'Upskilling and Development', category: 'Learn & grow', access: 'Microsoft sign-in', description: 'Courses and opportunities to build your skills and grow your career.', icon: 'M12 3l10 5-10 5L2 8zM6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5', href: '#demo' },
  { id: 'workshops', name: 'Workshops and Training', category: 'Learn & grow', access: 'Microsoft sign-in', description: 'Find upcoming workshops and training sessions to join.', icon: 'M4 6h16v11H4zM8 21h8M12 17v4M9 10h6', href: '#demo' },
  { id: 'wellbeing', name: 'Health and Wellbeing', category: 'Wellbeing', access: 'Microsoft sign-in', description: 'Resources and support to look after your health and wellbeing.', icon: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z', href: '#demo' },
];

export function makeApi() {
  return {
    me: async () => ({}),
    services: async () => services,
    launch: async (id) => ({ href: services.find((s) => s.id === id).href }),
  };
}
