import { 
  Collection,
  AddCollectionLink,
  DeleteCollectionLink, 
  EditCollectionLink, 
  Operation 
} from '@/types';

export class CollectionLinkGenerator {
  private memberId: string;
  private collectionType: Collection;
  // private operation: Operation;

  constructor(memberId: string, collectionType: Collection) {
    this.memberId = memberId;
    this.collectionType = collectionType;
  }

  createAddLink(): AddCollectionLink {
    return {
      pathname: `/member/[memberId]/[collectionType]/[operation]/[collectionId]`,
      query: {
        memberId: this.memberId,
        collectionType: this.collectionType,
        operation: Operation.Add,
      },
    };
  }

  createDeleteLink(id: string): DeleteCollectionLink {
    return {
      pathname: `/member/[memberId]/[collectionType]/[operation]/[collectionId]`,
      query: {
        memberId: this.memberId,
        collectionType: this.collectionType,
        operation: Operation.Delete,
        collectionId: id,
      },
    };
  }

  createEditLink(id: string): EditCollectionLink {
    return {
      pathname: `/member/[memberId]/[collectionType]/[operation]/[collectionId]`,
      query: {
        memberId: this.memberId,
        collectionType: this.collectionType,
        operation: Operation.Edit,
        collectionId: id,
      },
    };
  }
}
