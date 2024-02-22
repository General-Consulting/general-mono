import { 
  Collection,
  // AddCollectionLink,
  // DeleteCollectionLink, 
  // EditCollectionLink, 
  Operation 
} from '@/types';

export default class CollectionLinkGenerator {
  private memberId: string;
  private collectionName: Collection;
  // private operation: Operation;

  constructor(memberId: string, collectionType: Collection) {
    this.memberId = memberId;
    this.collectionName = collectionType;
  }

  createAddLink(): string {
    const memberId = this.memberId
    const collectionName = this.collectionName
    const operation = Operation.Add

    // Return URL string with form: 
    // "/member/[memberId]/[collectionType]/add"
    return `/forms/member/${memberId}/${collectionName}/${operation}`
  }

  createDeleteLink(id: string): string {
    const memberId = this.memberId
    const collectionType = this.collectionName
    const operation = Operation.Delete

    // Return URL string with form: 
    // "/member/[memberId]/[collectionType]/delete/[collectionId]"
    return `/forms/member/${memberId}/${collectionType}/${operation}/${id}`
  }

  createEditLink(id: string): string {
    const memberId = this.memberId
    const collectionName = this.collectionName
    const operation = Operation.Edit

    // Return URL string with form: 
    // "/member/[memberId]/[collectionType]/edit/[collectionId]"
    return `/forms/member/${memberId}/${collectionName}/${operation}/${id}`
  }
}
