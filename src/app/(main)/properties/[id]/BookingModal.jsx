"use client";

import { useState } from "react";
import {
    Modal,
    Button,
    Input,
    TextArea,
    DatePicker,
    DateField,
    Calendar as HeroCalendar,
    Label,
    FieldError,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import {
    CalendarDays,
    Phone,
    User,
    MessageSquare,
    CreditCard,
    X,
} from "lucide-react";
import { toast } from "react-toastify";

// ==================== BOOKING MODAL COMPONENT ====================
export default function BookingModal({
    isOpen,
    onClose,
    property,
    tenant,
    propertyId,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [bookingData, setBookingData] = useState({
        moveInDate: null,
        contactNumber: "",
        fullName: "",
        email: "",
        additionalNotes: "",
    });

    const formatPrice = (price) => `$${price.toLocaleString()}`;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setBookingData((prev) => ({
            ...prev,
            moveInDate: date,
        }));
    };

    const resetForm = () => {
        setBookingData({
            moveInDate: null,
            contactNumber: "",
            fullName: "",
            email: "",
            additionalNotes: "",
        });
    };

    const handleClose = () => {
        onClose();
        resetForm();
    };

    // Get today's date
    const currentDate = today(getLocalTimeZone());
    const isInvalid = bookingData.moveInDate != null && bookingData.moveInDate.compare(currentDate) < 0;
    const isFormValid = bookingData.moveInDate && bookingData.contactNumber;


    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="lg" className="max-w-lg">
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[480px] bg-white rounded-2xl border-2 border-blue-100/50 shadow-2xl">
                        {/* Header */}
                        <Modal.Header className="relative px-6 pt-6 pb-4 border-b border-gray-100">
                            <div className="flex items-center justify-between w-full">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <CalendarDays className="w-5 h-5 text-blue-600" strokeWidth={2} />
                                        <Modal.Heading className="text-xl font-extrabold text-gray-900">
                                            Book Property
                                        </Modal.Heading>
                                    </div>
                                    <p className="text-sm text-gray-500">{property?.title}</p>
                                </div>
                                <Modal.CloseTrigger>
                                    <div className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                                        <X className="w-5 h-5 text-gray-400" />
                                    </div>
                                </Modal.CloseTrigger>
                            </div>
                        </Modal.Header>

                        {/* Body */}
                        <Modal.Body className="px-6 py-6 space-y-5">
                            {/* Price Summary */}
                            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Price per month</span>
                                    <span className="text-lg font-bold text-blue-600">
                                        {formatPrice(property?.price)}
                                    </span>
                                </div>
                            </div>

                            {/* Move-in Date */}
                            <DatePicker
                                isRequired
                                className="w-full"
                                isInvalid={isInvalid}
                                minValue={currentDate}
                                name="moveInDate"
                                value={bookingData.moveInDate}
                                onChange={handleDateChange}
                            >
                                <Label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Move-in Date
                                </Label>
                                <DateField.Group fullWidth>
                                    <DateField.Input>
                                        {(segment) => (
                                            <DateField.Segment
                                                segment={segment}
                                                className="bg-transparent text-gray-800 placeholder:text-gray-400"
                                            />
                                        )}
                                    </DateField.Input>
                                    <DateField.Suffix>
                                        <DatePicker.Trigger>
                                            <DatePicker.TriggerIndicator className="text-blue-400" />
                                        </DatePicker.Trigger>
                                    </DateField.Suffix>
                                </DateField.Group>
                                <FieldError className="text-xs text-rose-500 mt-1">
                                    Date must be today or in the future.
                                </FieldError>
                                <DatePicker.Popover>
                                    <HeroCalendar aria-label="Move-in date">
                                        <HeroCalendar.Header>
                                            <HeroCalendar.YearPickerTrigger>
                                                <HeroCalendar.YearPickerTriggerHeading />
                                                <HeroCalendar.YearPickerTriggerIndicator />
                                            </HeroCalendar.YearPickerTrigger>
                                            <HeroCalendar.NavButton slot="previous" />
                                            <HeroCalendar.NavButton slot="next" />
                                        </HeroCalendar.Header>
                                        <HeroCalendar.Grid>
                                            <HeroCalendar.GridHeader>
                                                {(day) => (
                                                    <HeroCalendar.HeaderCell className="text-xs text-gray-500">
                                                        {day}
                                                    </HeroCalendar.HeaderCell>
                                                )}
                                            </HeroCalendar.GridHeader>
                                            <HeroCalendar.GridBody>
                                                {(date) => (
                                                    <HeroCalendar.Cell
                                                        date={date}
                                                        className="hover:bg-blue-50 rounded-full transition-colors"
                                                    />
                                                )}
                                            </HeroCalendar.GridBody>
                                        </HeroCalendar.Grid>
                                        <HeroCalendar.YearPickerGrid>
                                            <HeroCalendar.YearPickerGridBody>
                                                {({ year }) => (
                                                    <HeroCalendar.YearPickerCell
                                                        year={year}
                                                        className="hover:bg-blue-50 rounded-lg transition-colors"
                                                    />
                                                )}
                                            </HeroCalendar.YearPickerGridBody>
                                        </HeroCalendar.YearPickerGrid>
                                    </HeroCalendar>
                                </DatePicker.Popover>
                            </DatePicker>

                            {/* Contact Number */}
                            <div>
                                <Label isRequired className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Contact Number
                                </Label>
                                <Input
                                    isRequired
                                    type="tel"
                                    name="contactNumber"
                                    value={bookingData.contactNumber}
                                    onChange={handleInputChange}
                                    placeholder="+1 (555) 123-4567"
                                    className="w-full"
                                    classNames={{
                                        input: "bg-transparent text-gray-800 placeholder:text-gray-400",
                                        inputWrapper:
                                            "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-blue-300",
                                    }}
                                    startContent={
                                        <Phone className="w-4 h-4 text-blue-400" strokeWidth={2} />
                                    }
                                />
                            </div>

                            {/* User Info */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Full Name
                                    </Label>
                                    <Input
                                        isRequired
                                        type="text"
                                        name="fullName"
                                        value={bookingData.fullName || tenant?.name || ""}
                                        onChange={handleInputChange}
                                        placeholder="Your full name"
                                        className="w-full"
                                        classNames={{
                                            input: "bg-transparent text-gray-800 placeholder:text-gray-400",
                                            inputWrapper:
                                                "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-blue-300",
                                        }}
                                        startContent={
                                            <User className="w-4 h-4 text-blue-400" strokeWidth={2} />
                                        }
                                    />
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email
                                    </Label>
                                    <Input
                                        isRequired
                                        type="email"
                                        name="email"
                                        value={bookingData.email || tenant?.email || ""}
                                        onChange={handleInputChange}
                                        placeholder="your@email.com"
                                        className="w-full"
                                        classNames={{
                                            input: "bg-transparent text-gray-800 placeholder:text-gray-400",
                                            inputWrapper:
                                                "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-blue-300",
                                        }}
                                        startContent={
                                            <MessageSquare className="w-4 h-4 text-blue-400" strokeWidth={2} />
                                        }
                                    />
                                </div>
                            </div>

                            {/* Additional Notes */}
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Additional Notes
                                </Label>
                                <TextArea
                                    name="additionalNotes"
                                    value={bookingData.additionalNotes}
                                    onChange={handleInputChange}
                                    placeholder="Any special requests or requirements..."
                                    rows={2}
                                    className="w-full"
                                    classNames={{
                                        input: "bg-transparent text-gray-800 placeholder:text-gray-400 resize-none",
                                        inputWrapper:
                                            "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-blue-300",
                                    }}
                                />
                            </div>

                            {/* Payment Summary */}
                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <CreditCard className="w-3.5 h-3.5" strokeWidth={2} />
                                    <span>Secure payment powered by Stripe</span>
                                </div>
                            </div>
                        </Modal.Body>

                        {/* Footer */}
                        <Modal.Footer className="px-6 pb-6 pt-4 border-t border-gray-100 flex gap-3">
                            <Button
                                className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all duration-300"
                                slot="close"
                            >
                                Cancel
                            </Button>

                            <form action="/api/payment" method="POST" className="flex-1">
                                {/* Hidden inputs to send booking data */}
                                <input type="hidden" name="propertyId" value={propertyId} />
                                <input type="hidden" name="propertyTitle" value={property?.title} />
                                <input type="hidden" name="propertyPrice" value={property?.price} />
                                <input type="hidden" name="ownerId" value={property?.ownerId} />
                                <input type="hidden" name="tenantId" value={tenant?.id} />
                                <input type="hidden" name="tenantName" value={tenant?.name} />
                                <input type="hidden" name="tenantEmail" value={tenant?.email} />
                                <input type="hidden" name="moveInDate" value={bookingData.moveInDate?.toString() || ""} />
                                <input type="hidden" name="contactNumber" value={bookingData.contactNumber} />
                                <input type="hidden" name="fullName" value={bookingData.fullName || tenant?.name || ""} />
                                <input type="hidden" name="email" value={bookingData.email || tenant?.email || ""} />
                                <input type="hidden" name="additionalNotes" value={bookingData.additionalNotes} />
                                <input type="hidden" name="amount" value={property?.price} />

                                <Button
                                    type="submit"
                                    isDisabled={!isFormValid}
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <CreditCard className="w-4 h-4" strokeWidth={2} />
                                    <span>Pay & Confirm Booking</span>
                                </Button>
                            </form>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}