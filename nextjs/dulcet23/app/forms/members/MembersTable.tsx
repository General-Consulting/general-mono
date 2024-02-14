'use client'

import { useRouter } from 'next/navigation'

import { 
  TableContainer,
  TableTitle,
  Table,
} from "@/components/Table"
import HighlightButton from "@/components/HighlightButton"
import useMembersSubset from "@/store/useMembersSubset"
import MemberLinkGenerator from '@/utils/MemberLinkGenerator'

const MembersTable = () => {
  const router = useRouter()
  const membersSubset = useMembersSubset()

  const memberLinkGenerator = new MemberLinkGenerator

  // If user clicks "Add Member" button
  const addMemberLink = memberLinkGenerator.createAddLink()
  const handleAddMember = () => router.push(addMemberLink)

  return (
    <TableContainer>
      <TableTitle
        title="Household Members"
        description="List all household members, starting with the applicant."
      />
      <Table
        tableData={membersSubset}
        linkGenerator={memberLinkGenerator}
      />
      <HighlightButton onClick={handleAddMember}>
        Add Member
      </HighlightButton>
    </TableContainer>
  )
}

export default MembersTable
