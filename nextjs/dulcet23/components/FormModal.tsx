'use client'

import { Dialog, Transition } from '@headlessui/react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { Fragment, ReactNode } from 'react'
import { 
  FormProvider, 
  useForm, 
  DeepPartial, 
  DefaultValues, 
  FieldValues
} from "react-hook-form"

import DefaultButton from './DefaultButton'
import HighlightButton from './HighlightButton';


interface FormModalProps<TFormValues extends FieldValues> {
  title: string;
  isOpen: boolean;
  onCancel: () => void;
  onSave: () => void;
  children: ReactNode;
  defaultValues: DeepPartial<TFormValues>
}


const FormModal = <TFormValues extends FieldValues>({
  children,
  title,
  isOpen,
  onCancel,
  onSave,
  defaultValues,
}: FormModalProps<TFormValues>) => {
  const methods = useForm<TFormValues>({ 
    defaultValues: defaultValues as DefaultValues<TFormValues> 
  })

  const handleSave = () => onSave()
  const handleCancel = () => onCancel() 

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={handleCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <FormProvider {...methods}>
                  <form>
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                        <PencilIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          {title}
                        </Dialog.Title>
                        <div className="mt-2">
                          
                          {children}
                        </div>
                      </div>
                    </div>
                    <hr className="h-px mt-4 sm:mt-6 mb-4 sm:mb-10 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <div className="sm:flex sm:justify-between">
                      <DefaultButton
                        onClick={handleCancel}
                        className="w-full sm:w-24"
                      >
                        Cancel
                      </DefaultButton>
                      <HighlightButton
                        onClick={handleSave}
                        className="w-full sm:w-24"
                      >
                        Save
                      </HighlightButton>
                    </div>
                  </form>
                </FormProvider>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default FormModal