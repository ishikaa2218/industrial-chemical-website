import { Button } from '../components/common/Button'
import { Label } from '../components/common/Label'
import { Seo } from '../components/common/Seo'

export default function NotFound() {
  return (
    <section className="w-full bg-paper">
      <Seo title="Page not found" description="The page you are looking for could not be found." path="/404" />
      <div className="container-wide flex min-h-[70svh] flex-col justify-between py-16">
        <Label>Error 404</Label>
        <div>
          <h1 className="display text-[clamp(48px,9vw,140px)]">Page not found</h1>
          <p className="mt-6 max-w-[44ch] text-[16px] text-ink-soft">
            The page you were looking for has moved or does not exist.
          </p>
          <div className="mt-8 flex gap-[3px]">
            <Button to="/">Back to home</Button>
            <Button to="/products" variant="outline">
              Explore Applications
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
