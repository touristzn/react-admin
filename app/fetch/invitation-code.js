import fetch from '@/static/utils/fetchApi';

export function getInvitationCode(data) {
  const url = '/userService/api/v1/be/admin/invitationcode';
  return fetch.get(url, data)
}