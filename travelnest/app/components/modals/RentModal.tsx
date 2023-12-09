"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { categories } from "../navbar/Categories";
import {CategoryInput} from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
// we are loading Map dynamic-ally
// import Map from "../Map";
import {Counter} from "../inputs/Counter";
import {ImageUpload} from "../inputs/ImageUpload";
import dynamic from "next/dynamic";
import {Input} from "../inputs/Input";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

// Enum for different steps in the rental creation process
enum STEPS {
  CATEGORY = 0, // First step: Choose category
  LOCATION = 1, // Second step: Enter location
  INFO = 2, // Third step: Enter additional info
  IMAGES = 3, // Fourth step: Add images
  DESCRIPTION = 4, // Fifth step: Write description
  PRICE = 5, // Sixth and final step: Set price
}

// Type for props (currently empty)
type Props = {};

const RentModal = (props: Props) => {
  // Router for navigation
  const router = useRouter();
  // Hook for managing rent modal state
  const rentModal = useRentModal();
  // State for current step
  const [step, setStep] = useState(STEPS.CATEGORY);
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);

  // Use react-hook-form for form management
  const {
    register, // Register input fields
    handleSubmit, // Submit handler
    setValue, // Set form values
    watch, // Watch changes in form values
    formState: { errors }, // Access form errors
    reset, // Reset form state
  } = useForm<FieldValues>({
    defaultValues: {
      category: "", // Category of the rental
      location: null, // Location of the rental
      guestCount: 1, // Maximum number of guests
      roomCount: 1, // Number of rooms
      bathroomCount: 1, // Number of bathrooms
      imageSrc: "", // URL of the image
      price: 1, // Price per night
      title: "", // Title of the listing
      description: "", // Description of the listing
    },
  });

  // Get current values from form
  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  // Dynamically import the map component when it's needed
  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  // Function to set a specific form value
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true, // Mark field as dirty
      shouldTouch: true, // Mark field as touched
      shouldValidate: true, // Revalidate the form
    });
  };

  // Go back to the previous step
  const onBack = () => {
    setStep((value) => value - 1); // Decrement step
  };

  // Proceed to the next step
  const onNext = () => {
    setStep((value) => value + 1); // Increment step
  };

  // Submit the form and create the listing
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Don't submit if not on the final step
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    // Show loading indicator
    setIsLoading(true);

    // Send data to API using axios
    axios
      .post("/api/listings", data)
      .then(() => {
        // Show success message and refresh the page
        toast.success("Listing Created!");
        router.refresh();
        reset(); // Reset form state
        setStep(STEPS.CATEGORY); // Go back to the first step
      })
      .catch(() => {
        // Show error message
        toast.error("Something went wrong :(");
      })
      .finally(() => {
        // Hide loading indicator
        setIsLoading(false);
      });
  };

  // Change action button label based on the current step
  const actionLabel = useMemo(() => {
    return step === STEPS.PRICE ? "Create" : "Next";
  }, [step]);

  // Show "Back" button only on steps after the first
  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.CATEGORY ? undefined : "Back";
  }, [step]);

  let bodyContent = ( // This variable stores the dynamic content to be rendered
    <div className="flex flex-col gap-8"> // Main container with styling
      <Heading // Component with title and subtitle for current step
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto"> // Grid container for category options
        {categories.map((item) => ( // Loop through each category item
          <div key={item.label} className="col-span-1"> // Wrap each category with key and styling
            <CategoryInput // Category component with click handler, label, icon, and selected state
              onClick={(category) => setCustomValue("category", category)}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) { // Check for specific step to render location content
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading // Heading component for location step
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect // Country selection component with value and change handler
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} /> // Map component with location center
      </div>
    );
  }

  if (step === STEPS.INFO) { // Check for step to render information content
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading // Heading component for information step
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter // Counter component for guests with title, subtitle, value, and change handler
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter // Similar counter component for rooms
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter // Similar counter component for bathrooms
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) { // Check for step to render image upload content
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading // Heading component for image upload step
          title="Add a photo of your place"
          subtitle="Show guests what your place look like!"
        />
        <ImageUpload // Image upload component with value and change handler
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }
  if (step === STEPS.DESCRIPTION) {
    // Check for step to render description content
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input // Input component for title
          id="title"
          label="Title"
          disabled={isLoading} // Disable input if loading
          register={register} // Register input for form validation
          errors={errors} // Display any validation errors
          required // Mark input as required
        />
        <hr />
        <Input // Input component for description
          id="description"
          label="Description"
          disabled={isLoading} // Disable input if loading
          register={register} // Register input for form validation
          errors={errors} // Display any validation errors
          required // Mark input as required
        />
      </div>
    );
  }
  
  if (step === STEPS.PRICE) {
    // Check for step to render price content
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input // Input component for price
          id="price"
          label="Price"
          disabled={isLoading} // Disable input if loading
          register={register} // Register input for form validation
          errors={errors} // Display any validation errors
          required // Mark input as required
          type="number" // Set input type to number
          formatPrice // Apply custom formatting to price value
        />
      </div>
    );
  }
  
  return (
    <Modal
      title="Post property" // Modal title
      isOpen={rentModal.isOpen} // Check if modal is open
      onClose={rentModal.onClose} // Function to close modal
      onSubmit={handleSubmit(onSubmit)} // Handle form submit
      actionLabel={actionLabel} // Primary action button label
      secondaryActionLabel={secondaryActionLabel} // Secondary action button label (optional)
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack} // Define secondary action based on step
      body={bodyContent} // Set modal body content
    />
  );
  };
export default RentModal;
