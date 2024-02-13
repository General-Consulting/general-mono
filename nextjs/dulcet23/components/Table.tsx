'use client'

import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import EditButton from './EditButton'
import DeleteButton from './DeleteButton'
import CollectionLinkGenerator from '@/utils/CollectionLinkGenerator'
import MemberLinkGenerator from '@/utils/MemberLinkGenerator'

import { TableData } from '@/types'

/* getStyleByColumnIndex function
 * - Used by TableHead and TableBody to hide middle columns on small screens.
 * - Takes in an `index` and returns a Tailwind utility class.
 */

const getStyleByColumnIndex = (index: number): string => {
  switch (index) {
    case 0:
      return 'text-left py-3.5 pl-4 pr-3'
    case 1:
      return 'hidden sm:table-cell text-left py-3.5 pl-4 pr-3 sm:pl-0'
    default:
      return 'hidden md:table-cell text-left py-3.5 pl-4 pr-3 sm:pl-0'
  } 
}

/* TableContainer component
 * - Just for padding
 */
interface TableContainerProps {
  children: ReactNode;
}

export const TableContainer = ({ children }: TableContainerProps) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}

/* TableTitle component
 * - Displays title & description
 * - Not actually part of the HTML <table>
 */
interface TableTitleProps {
  title: string;
  description: string;
}

export const TableTitle = ({ title, description }: TableTitleProps) => {
  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          {description}
        </p>
      </div>
    </div>
  )
}

/*
 * Define the TableCell component
 */ 
interface TableCellProps {
  children: ReactNode
  className?: string
}

const TableCell = ({
  children,   
  className 
}: TableCellProps) => {
  return (
    <td 
      className={clsx(        
        "whitespace-nowrap",
        className, // Add or overwrite classes
      )}
    >
      {children}
    </td>
  )
}

/* TableTH component
 * - Just styling for <th> tag's font & text
 */
interface TableTHProps {
  className?: string
  children: ReactNode;
}

const TableTH = ({ className, children }: TableTHProps) => {
  return (
    <th 
      className={clsx(
        "text-sm font-semibold text-gray-900",
        className, // Add or overwrite styles
      )}
    >
      {children}
    </th>
  )
}



/* 
 * TableHead component
 * - Hide middle columns at small sizes
 * - Always include an Edit and Delete column
 */
interface TableHeadProps {
  tableData: TableData
}

export const TableHead = ({ tableData }: TableHeadProps) => {
 
  // Handle case where there is no table data
  if (tableData.length === 0) return (
    <thead>
      <tr key={`empty-table-head`}>
        <td>
          No data yet.
        </td>
      </tr>
    </thead>
  )

  const firstObject = tableData[0] // Get first object
  const { id, ...rest } = firstObject as Record<string, any> // Exclude 'id' property
  const headers = Object.keys(rest).map(key => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
  });

  return (
    <thead>
      <tr>
        {/* Map over column headers */}
        {headers.map((header, index) => (
          <TableTH
            key={`header-${index}`}
            className={getStyleByColumnIndex(index)}
          >
            {header}
          </TableTH>
        ))}
        
        {/* Always display Edit button and Delete button */}
        <TableTH 
          key="Edit"
          className="text-center w-16"
        >
          Edit
        </TableTH>
        <TableTH 
          key="Delete"
          className="text-center w-12"
        >
          Delete
        </TableTH>
      </tr>
    </thead>
  )
}

/* TableBody component
 * - Render tableData
 * - Example use: members array or income array
 */
interface TableBodyProps {
  tableData: TableData;
  linkGenerator: CollectionLinkGenerator | MemberLinkGenerator
}

export const TableBody = ({ 
  tableData,
  linkGenerator
}: TableBodyProps) => {
  const router = useRouter()

  // If no table data, render empty table
  if (tableData.length === 0) return (
    <tbody>
      <tr key={`empty-table-body`}>
        <td>
          Add some data
        </td>
      </tr>
    </tbody>
  )

  // Open delete modal when user clicks delete button in table
  const handleDelete = (id: string) => {
    const deleteLink = linkGenerator.createDeleteLink(id)
    router.push(deleteLink)
  }

  // Open edit modal when user clicks edit button in table
  const handleEdit = (id: string) => {
    const editLink = linkGenerator.createEditLink(id)
    router.push(editLink)
  }

  return (
    <tbody className="divide-y divide-gray-200">

      {/* First, iterate over array of objects, e.g. members, income, etc */}
      {tableData.map((item, itemIndex) => {
        {/* Get the id, for use in the callbacks */}
        const { id, ...rest } = item as Record<string, any>

        return (
          <tr key={`row-${itemIndex}`}>

            {/* Second, iterate over values for each individual object */}
            {Object.values(rest).map((value, cellIndex) => (
              <TableCell 
                key={`cell-${cellIndex}`} 
                className={clsx(
                  'text-gray-500',
                  getStyleByColumnIndex(cellIndex)
                )}
              >
                {`${value}`}
              </TableCell>
            ))}

            {/* Always display Edit button and Delete button */}
            <td className="text-center w-16 align-text-bottom">
              <EditButton onClick={() => handleEdit(id)} />
            </td>
            <td className="text-center w-16 pt-1 align-text-bottom">
              <DeleteButton onClick={() => handleDelete(id)} />
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}


/* Table component
 * - Renders <table> component
 */
interface TableProps {
  tableData: TableData; 
  linkGenerator: CollectionLinkGenerator | MemberLinkGenerator
}

export const Table = ({ 
  tableData,
  linkGenerator
}: TableProps) => {
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <TableHead 
              tableData={tableData} 
            />
            <TableBody 
              tableData={tableData} 
              linkGenerator={linkGenerator}
            />
          </table>
        </div>
      </div>
    </div>
  )
}
