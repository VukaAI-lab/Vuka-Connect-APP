// DEMO ONLY: sample data. No network calls, no real service links.
const services = [
  { id: 'it-support', name: 'IT Support', category: 'Support', access: 'Microsoft sign-in', description: 'Log hardware and software queries, and request or borrow IT equipment.', icon: 'M3 5h18v11H3zM8 20h8M12 16v4', href: '#demo' },
  { id: 'hr-tickets', name: 'HR Tickets', category: 'People', access: 'Microsoft sign-in', description: 'Raise HR queries, requests or issues so the team can track and resolve them.', icon: 'M16 8a4 4 0 1 0-8 0 4 4 0 0 0 8 0zM4 21c0-4 3.6-6 8-6s8 2 8 6', href: '#demo' },
  { id: 'dynamics-payroll', name: 'Dynamics Payroll', category: 'People', access: 'Single sign-on', description: 'Apply for leave, check your balance and manage your employee details.', icon: 'M3 7h17a1 1 0 0 1 1 1v11H4a1 1 0 0 1-1-1zM3 7l13-3v3M16 13h3', href: '#demo' },
  { id: 'vuka-website', name: 'VUKA Website', category: 'Company', access: 'Public site', description: 'Our portfolio, events calendar, careers and success stories.', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18', href: 'https://wearevuka.com' },
];

export function makeApi() {
  return {
    me: async () => ({}),
    services: async () => services,
    launch: async (id) => ({ href: services.find((s) => s.id === id).href }),
  };
}
