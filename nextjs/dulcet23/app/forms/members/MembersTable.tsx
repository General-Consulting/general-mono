'use client'

import { useRouter } from 'next/navigation'

import { 
  TableContainer,
  TableTitle,
  Table,
} from "@/components/Table"
import HighlightButton from "@/components/HighlightButton"
import useMembersSubset from "@/store/useMembersSubset"

const MembersTable = () => {
  const router = useRouter()
  const membersSubset = useMembersSubset()

  console.log('In MembersTable and membersSubset is', membersSubset)

  // If user clicks "Add Member" button
  const handleAddMember = () => router.push('/forms/members/add-member')

  // If user clicks "Edit" pencil icon
  const handleEdit = () => {
    // const editPath = `forms/members/edit-member/${memberId}`
    // router.push(editPath)
    console.log('blash')
  }

  return (
    <TableContainer>
      <TableTitle
        title="Household Members"
        description="List all household members, starting with the applicant."
      />
      <Table
        tableData={membersSubset}
        onEdit={handleEdit}
        onDelete={() => console.log('Delete!')}
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
