export default function Example() {
  return (
    <div className="bg-white py-16 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-xl bg-indigo-500 py-24 px-8 shadow-2xl lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-16">
          <div className="absolute inset-0 opacity-50 mix-blend-multiply saturate-0 filter">
            <img
              src="https://images.unsplash.com/photo-1601381718415-a05fb0a261f3?ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8ODl8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1216&q=80"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative lg:col-span-1">
            <img className="h-12 w-auto" src="https://tailwindui.com/img/logos/workcation-logo-white.svg" alt="" />
            <blockquote className="mt-6 text-white">
              <p className="text-xl font-medium sm:text-2xl">
                This app has completely transformed how we interact with customers. We've seen record bookings, higher
                customer satisfaction, and reduced churn.
              </p>
              <footer className="mt-6">
                <p className="flex flex-col font-medium">
                  <span>Marie Chilvers</span>
                  <span>CEO, Workcation</span>
                </p>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}
