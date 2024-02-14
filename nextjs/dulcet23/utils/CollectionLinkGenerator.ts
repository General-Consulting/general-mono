import { 
  Collection,
  // AddCollectionLink,
  // DeleteCollectionLink, 
  // EditCollectionLink, 
  Operation 
} from '@/types';

export default class CollectionLinkGenerator {
  private memberId: string;
  private collectionType: Collection;
  // private operation: Operation;

  constructor(memberId: string, collectionType: Collection) {
    this.memberId = memberId;
    this.collectionType = collectionType;
  }

  createAddLink(): string {
    const memberId = this.memberId
    const collectionType = this.collectionType
    const operation = Operation.Add

    // Return URL string with form: 
    // "/member/[memberId]/[collectionType]/add"
    return `/forms/member/${memberId}/${collectionType}/${operation}`
  }

  createDeleteLink(id: string): string {
    const memberId = this.memberId
    const collectionType = this.collectionType
    const operation = Operation.Delete

    // Return URL string with form: 
    // "/member/[memberId]/[collectionType]/delete/[collectionId]"
    return `/forms/member/${memberId}/${collectionType}/${operation}/${id}`
  }

  createEditLink(id: string): string {
    const memberId = this.memberId
    const collectionType = this.collectionType
    const operation = Operation.Edit

    // Return URL string with form: 
    // "/member/[memberId]/[collectionType]/edit/[collectionId]"
    return `/forms/member/${memberId}/${collectionType}/${operation}/${id}`
  }
}
