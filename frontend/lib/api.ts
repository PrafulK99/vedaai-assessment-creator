const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const API_URL = BASE_URL.endsWith('/api') ? BASE_URL : `${BASE_URL}/api`;

export const createAssignment = async (data: any) => {
  const res = await fetch(`${API_URL}/assignments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create assignment');
  return res.json();
};

export const generateAssessment = async (assignmentId: string) => {
  const res = await fetch(`${API_URL}/assignments/${assignmentId}/generate`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to trigger generation');
  return res.json();
};

export const getAssessment = async (assessmentId: string) => {
  const res = await fetch(`${API_URL}/assessments/${assessmentId}`);
  if (!res.ok) throw new Error('Failed to fetch assessment');
  return res.json();
};
