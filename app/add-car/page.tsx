import AddCarForm from "@/components/add-car/add-car-form"
import AddCarHero from "@/components/add-car/add-car-hero"

export default function AddCarPage() {
  return (
    <div className="overflow-hidden">
      <AddCarHero />
      <div className="max-w-5xl mx-auto px-4 py-16">
        <AddCarForm />
      </div>
    </div>
  )
}
