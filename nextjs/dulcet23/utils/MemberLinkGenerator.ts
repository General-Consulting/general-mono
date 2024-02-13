// import { 
//   DeleteMemberLink, 
//   EditMemberLink, 
// } from '@/types';

export default class MemberLinkGenerator {
  constructor() {}

  createAddLink(): string {
    // Return URL string with form: 
    // "/members/add-member"
    return 'members/add-member'
  }

  createDeleteLink(id: string): string {
    // Return URL string with form: 
    // "/members/delete-member/[memberId]"
    return `/members/delete-member/${id}`
  }

  createEditLink(id: string): string {
    // Return URL string with form: 
    // "/members/delete-member/[memberId]"
    return `/members/edit-member/${id}`
  }
}
