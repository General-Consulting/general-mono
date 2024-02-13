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

  console.log('In MembersTable and membersSubset is', membersSubset)

  // If user clicks "Add Member" button
  const handleAddMember = () => router.push('/forms/members/add-member')

  const memberLinkGenerator = new MemberLinkGenerator

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
      <HighlightButton
        onClick={handleAddMember} 
      >
        Add Member
      </HighlightButton>
    </TableContainer>
  )
}

export default MembersTable
