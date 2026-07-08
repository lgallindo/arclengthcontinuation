/**
 * Utility to check if a user is a ArclengthContinuation team member
 */
export function isArclengthContinuationTeamMember(email?: string): boolean {
  if (!email) return false;
  return email.endsWith("@arclength-continuation.dev");
}
