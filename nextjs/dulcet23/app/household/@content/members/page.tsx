'use client'


import useMembers from '@/store/useMembersSubset'
import MembersTable from './MembersTable'


const PageComponent = () => {
  const members = useMembers()

  console.log('members', members)

  return (
    <>
      <MembersTable />
    </>
  )
}

export default PageComponent
