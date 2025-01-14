import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "How does ROAST work?",
    answer:
      `ROAST is an online dating profile review tool that combines the best of both worlds - digital and human.

      Mobile technology can take you anywhere, combined with the power of human feedback - a dedicated team of dating experts is here to encourage you and keep you accountable in your online dating journey.
      
      Starting to use ROAST is pretty straightforward:
      1. Upload your pictures (or share your Tinder username)
      2. Get your profile reviewed in seconds by our A.I.
      3. Claim your expert review and get feedback from our dating experts in ~24h.
      4. Apply the tips & Match!`,
  },
  {
    question: "How does ROAST work?",
    answer:
      `ROAST is an online dating profile review tool that combines the best of both worlds - digital and human.

      Mobile technology can take you anywhere, combined with the power of human feedback - a dedicated team of dating experts is here to encourage you and keep you accountable in your online dating journey.
      
      Starting to use ROAST is pretty straightforward:
      1. Upload your pictures (or share your Tinder username)
      2. Get your profile reviewed in seconds by our A.I.
      3. Claim your expert review and get feedback from our dating experts in ~24h.
      4. Apply the tips & Match!`,
  },
  {
    question: "How does ROAST work?",
    answer:
      `ROAST is an online dating profile review tool that combines the best of both worlds - digital and human.

      Mobile technology can take you anywhere, combined with the power of human feedback - a dedicated team of dating experts is here to encourage you and keep you accountable in your online dating journey.
      
      Starting to use ROAST is pretty straightforward:
      1. Upload your pictures (or share your Tinder username)
      2. Get your profile reviewed in seconds by our A.I.
      3. Claim your expert review and get feedback from our dating experts in ~24h.
      4. Apply the tips & Match!`,
  },
  {
    question: "How does ROAST work?",
    answer:
      `ROAST is an online dating profile review tool that combines the best of both worlds - digital and human.

      Mobile technology can take you anywhere, combined with the power of human feedback - a dedicated team of dating experts is here to encourage you and keep you accountable in your online dating journey.
      
      Starting to use ROAST is pretty straightforward:
      1. Upload your pictures (or share your Tinder username)
      2. Get your profile reviewed in seconds by our A.I.
      3. Claim your expert review and get feedback from our dating experts in ~24h.
      4. Apply the tips & Match!`,
  }
  // More questions...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
