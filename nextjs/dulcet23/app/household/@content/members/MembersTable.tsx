'use client'

import { Fragment, useState } from "react"

import FieldFactory from "@/components/FieldFactory"
import FormModal from "@/components/FormModal"
import { 
  TableContainer,
  TableTitle,
  Table,
} from "@/components/Table"
import HighlightButton from "@/components/HighlightButton"
import MemberFields from "./MemberFields"
import useMembersSubset from "@/store/useMembersSubset"
import { FieldData } from '@/types'
import getDefaultValues from "@/utils/getDefaultValues"



const forDevFieldsData: FieldData[] = [
  {
    name: 'name.firstName',
    label: 'First Name',
    component: 'Input' 
  },
  {
    name: 'name.lastName',
    label: 'Last Name',
    component: 'Input' 
  }
]

const MembersTable = () => {
  const [ openModal, setOpenModal ] = useState('')
  const membersSubset = useMembersSubset()

  // 1 - TODO - parse fields to get 
  // 2 - TODO - filter fields to get required member fields 
  // TODO - call getDefaultValues after getting 

  console.log('membersSubset', membersSubset)

  return (
    <TableContainer>
      <TableTitle
        title="Household Members"
        description="List all household members, starting with the applicant."
      />
      <Table
        tableData={membersSubset}
        onEdit={() => console.log('Edit!')}
        onDelete={() => console.log('Delete!')}
      />
      <HighlightButton
        onClick={() => {
          console.log('Clicked add member, add functionality :)')
        }} 
      >
        Add
      </HighlightButton>
      <FormModal
        title="Edit member"
        isOpen={true}
        onCancel={() => console.log('Cancelled!')}
        onSave={() => console.log('Saved!  Haha, not really...')}
        defaultValues={defaultValues}
      >
        <FieldFactory fieldsData={forDevFieldsData} />
      </FormModal>
    </TableContainer>
  )
}

export default MembersTable
