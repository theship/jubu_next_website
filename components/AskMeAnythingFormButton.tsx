import { useState } from 'react'
import { allFunds } from 'contentlayer/generated'
import type { Fund } from 'contentlayer/generated'
import PaymentModal from './PaymentModal'

export default function AskMeAnythingFormButton() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedFund, setSelectedFund] = useState<Fund>()
  const generalFund = allFunds.find((p) => p.slug === 'general')

  function closeModal() {
    setModalOpen(false)
  }

  function openPaymentModal(fund: Fund) {
    setSelectedFund(fund)
    setModalOpen(true)
  }

  function openGeneralFundModal() {
    openPaymentModal(generalFund)
  }

  return (
    <>
      <button
        onClick={openGeneralFundModal}
        className="mb-2 mr-2 mt-8 block rounded bg-indigo-900 px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-indigo-900 hover:text-black dark:text-black dark:hover:text-white"
      >
        Ask me anything—for a price...
      </button>
      <PaymentModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        fund={selectedFund}
      />
    </>
  )
}
