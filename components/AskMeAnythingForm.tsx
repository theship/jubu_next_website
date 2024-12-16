import { allFunds } from 'contentlayer/generated'
import DonationForm from './OLD_DonationForm'

export default function AskMeAnythingFormButton() {
  const generalFund = allFunds.find((f) => f.slug === 'general')

  return (
    <>
      <DonationForm
        projectNamePretty={generalFund.title}
        btcpay={generalFund.btcpay}
        zaprite={generalFund.zaprite}
      />
      <div className="mb-24"></div>
    </>
  )
}
