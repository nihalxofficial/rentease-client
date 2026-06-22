// src/app/register/page.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { 
  Form, 
  Input, 
  Label, 
  TextField, 
  Button, 
  FieldError, 
  Description,
  InputGroup,
} from "@heroui/react";
import { 
  User,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  Shield,
  Home,
  Users,
  Building2,
  Image as ImageIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// ==================== REGISTER PAGE ====================
export default function RegisterPage() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    const {email, password, image, name} = userData;

    const { data, error } = await authClient.signUp.email({
        email, 
        password,
        name,
        image,
    })

    if(data){
      toast.success("Registration Successful🎉");
      router.push("/")
    }
    if(error){
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[0-9]/.test(value)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return "Password must contain at least one special character";
    }
    return null;
  };

  const validateConfirmPassword = (value) => {
    const password = document.querySelector('input[name="password"]')?.value;
    if (value !== password) {
      return "Passwords do not match";
    }
    return null;
  };

  const features = [
    { icon: Shield, text: "Secure & Encrypted" },
    { icon: Users, text: "Community Trusted" },
    { icon: Building2, text: "Verified Properties" },
    { icon: Home, text: "Find Your Dream Home" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-blue-50/50 via-white to-white py-20 px-4">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Left Side - Hero Image & Content */}
          <div className="relative hidden lg:block h-full min-h-150 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="https://media.istockphoto.com/id/511061090/photo/business-office-building-in-london-england.jpg?s=612x612&w=0&k=20&c=nYAn4JKoCqO1hMTjZiND1PAIWoABuy1BwH1MhaEoG6w="
                alt="Register"
                fill
                className="object-cover"
                sizes="50vw"
                quality={90}
                priority
              />
              {/* Increased overlay for better text visibility */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/70 via-blue-700/60 to-blue-800/70" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 flex flex-col justify-center h-full text-white p-12">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6 w-fit"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white font-semibold text-xs uppercase tracking-widest">
                  Join Us Today
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl font-extrabold mb-4"
              >
                Start Your Journey
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-100 to-blue-400">
                  With RentEase
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-white/90 text-base max-w-sm mb-8"
              >
                Create your account and unlock a world of premium rental properties. Find your dream home with ease.
              </motion.p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-3"
              >
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/15">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-white" strokeWidth={2} />
                      </div>
                      <span className="text-white/90 text-sm font-medium">{feature.text}</span>
                    </div>
                  );
                })}
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex gap-6 mt-8 pt-6 border-t border-white/15"
              >
                <div>
                  <p className="text-2xl font-bold text-white">10,000+</p>
                  <p className="text-white/70 text-xs">Happy Users</p>
                </div>
                <div className="w-px bg-white/15" />
                <div>
                  <p className="text-2xl font-bold text-white">2,500+</p>
                  <p className="text-white/70 text-xs">Properties</p>
                </div>
                <div className="w-px bg-white/15" />
                <div>
                  <p className="text-2xl font-bold text-white">98%</p>
                  <p className="text-white/70 text-xs">Satisfaction</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white p-8 md:p-10 lg:p-12">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 group mb-8">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
                <Building2 className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="text-2xl font-extrabold bg-linear-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Rent<span className="bg-linear-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Ease</span>
              </span>
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900">
                Create Account
              </h1>
              <p className="text-gray-500 mt-2">
                Join thousands of happy users on RentEase
              </p>
            </div>

            <Form 
              className="flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
              {/* Name & Email - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  isRequired
                  name="name"
                  validate={(value) => {
                    if (value.length < 2) {
                      return "Name must be at least 2 characters";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" strokeWidth={2} />
                    Full Name
                  </Label>
                  <Input
                    placeholder="John Doe"
                    className="w-full"
                    classNames={{
                      input: "bg-transparent text-gray-800 placeholder:text-gray-400",
                      inputWrapper: "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-blue-300",
                    }}
                  />
                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  name="email"
                  type="email"
                  validate={(value) => {
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                      return "Please enter a valid email address";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" strokeWidth={2} />
                    Email Address
                  </Label>
                  <Input
                    placeholder="john@example.com"
                    className="w-full"
                    classNames={{
                      input: "bg-transparent text-gray-800 placeholder:text-gray-400",
                      inputWrapper: "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-blue-300",
                    }}
                  />
                  <FieldError />
                </TextField>
              </div>

              {/* Password & Confirm Password - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  isRequired
                  minLength={8}
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  validate={validatePassword}
                >
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-blue-600" strokeWidth={2} />
                    Password
                  </Label>
                  <InputGroup>
                    <InputGroup.Input
                      placeholder="Enter your password"
                      className="w-full"
                      classNames={{
                        input: "bg-transparent text-gray-800 placeholder:text-gray-400",
                        inputWrapper: "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-blue-300",
                      }}
                    />
                    <InputGroup.Suffix className="pr-1">
                      <Button
                        isIconOnly
                        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                        size="sm"
                        variant="ghost"
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="cursor-pointer text-gray-400 hover:text-gray-600"
                      >
                        {isPasswordVisible ? <Eye className="w-4 h-4" /> : <EyeSlash className="w-4 h-4" />}
                      </Button>
                    </InputGroup.Suffix>
                  </InputGroup>
                  <Description className="text-xs text-gray-400">
                    Must be at least 8 characters
                  </Description>
                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  name="confirmPassword"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  validate={validateConfirmPassword}
                >
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-blue-600" strokeWidth={2} />
                    Confirm Password
                  </Label>
                  <InputGroup>
                    <InputGroup.Input
                      placeholder="Confirm your password"
                      className="w-full"
                      classNames={{
                        input: "bg-transparent text-gray-800 placeholder:text-gray-400",
                        inputWrapper: "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-blue-300",
                      }}
                    />
                    <InputGroup.Suffix className="pr-1">
                      <Button
                        isIconOnly
                        aria-label={isConfirmPasswordVisible ? "Hide password" : "Show password"}
                        size="sm"
                        variant="ghost"
                        onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                        className="cursor-pointer text-gray-400 hover:text-gray-600"
                      >
                        {isConfirmPasswordVisible ? <Eye className="w-4 h-4" /> : <EyeSlash className="w-4 h-4" />}
                      </Button>
                    </InputGroup.Suffix>
                  </InputGroup>
                  <FieldError />
                </TextField>
              </div>

              {/* Image URL Field - Full Width */}
              <TextField
                name="image"
                validate={(value) => {
                  if (value && !/^https?:\/\/.+\..+/.test(value)) {
                    return "Please enter a valid image URL";
                  }
                  return null;
                }}
              >
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-blue-600" strokeWidth={2} />
                  Profile Image URL
                </Label>
                <Input
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full"
                  classNames={{
                    input: "bg-transparent text-gray-800 placeholder:text-gray-400",
                    inputWrapper: "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-blue-300",
                  }}
                />
                <Description className="text-xs text-gray-400">
                  Optional: Enter a URL for your profile picture
                </Description>
                <FieldError />
              </TextField>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer px-6 py-3.5 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                  </>
                )}
              </Button>
            </Form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                Sign In
              </Link>
            </p>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">or continue with</span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button
                variant="secondary"
                className="flex-1 cursor-pointer bg-gray-50 border-2 border-gray-200 rounded-xl py-3 hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg font-bold text-blue-600">G</span>
                <span className="text-sm font-medium text-gray-700">Google</span>
              </Button>
              <Button
                variant="secondary"
                className="flex-1 cursor-pointer bg-gray-50 border-2 border-gray-200 rounded-xl py-3 hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg font-bold text-blue-600">f</span>
                <span className="text-sm font-medium text-gray-700">Facebook</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}