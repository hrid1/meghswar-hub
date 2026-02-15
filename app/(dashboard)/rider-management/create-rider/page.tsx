"use client";

import React, { useState } from 'react';
import { uploadFileToAws } from '@/lib/upload';
import { Upload, X, ChevronDown, User } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';

interface RiderFormData {
  // Personal Information
  name: string;
  licenseNumber: string;
  bikeType: string;
  mobile: string;
  guardianMobile: string;
  nidNumber: string;
  email: string;
  password: string;
  
  // Address Information
  presentAddress: string;
  permanentAddress: string;
  
  // Assignment & Financials
  hub: string;
  fixedSalary: string;
  commission: string;
  
  // Bank Information
  bankName: string;
  bankAccountNumber: string;
  bankBranchName: string;
  
  // File uploads (handled separately)
  profilePhoto?: File;
  nidFront?: File;
  nidBack?: File;
  licenseFront?: File;
  licenseBack?: File;
  parentNidFront?: File;
  parentNidBack?: File;
}

const CreateRiderForm = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({});

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RiderFormData>({
    defaultValues: {
      name: 'Ahmed Wasi',
      licenseNumber: 'DH-38439',
      bikeType: 'Motor Bike',
      mobile: '+8801234567890',
      guardianMobile: '+8801234567890',
      nidNumber: '88741258893',
      email: 'wasi@gmail.com',
      password: '',
      presentAddress: '72/3, Bashundhara Avenue, Dhaka',
      permanentAddress: '72/3, Bashundhara Avenue, Dhaka',
      fixedSalary: '৳ 1,187',
      commission: '৳ 1,187',
    },
  });

  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const match = document.cookie
      ?.split('; ')
      .find((row) => row.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split('=')[1]) : null;
  };

  const getAuthHeaders = (): Record<string, string> => {
    const token = getCookie('access_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const parseAmount = (value: string) => {
    const numeric = value.replace(/[^0-9.]/g, '');
    return numeric ? Number(numeric) : 0;
  };

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const onSubmit = async (data: RiderFormData) => {
    console.log('Form Data:', data);
    console.log('Uploaded Files:', uploadedFiles);
    
    // Here you would handle form submission with API call
    try {
      if (!apiBaseUrl) throw new Error('Missing NEXT_PUBLIC_API_URL');

      const bikeTypeMap: Record<string, string> = {
        'Motor Bike': 'MOTORCYCLE',
        Bicycle: 'BICYCLE',
        Scooter: 'SCOOTER',
        Car: 'CAR',
      };

      const uploadTargets = [
        { field: 'profilePhoto', module: 'riders/profile', apiField: 'photo' },
        { field: 'nidFront', module: 'riders/nid', apiField: 'nid_front_photo' },
        { field: 'nidBack', module: 'riders/nid', apiField: 'nid_back_photo' },
        { field: 'licenseFront', module: 'riders/license', apiField: 'license_front_photo' },
        { field: 'licenseBack', module: 'riders/license', apiField: 'license_back_photo' },
        { field: 'parentNidFront', module: 'riders/parent-nid', apiField: 'parent_nid_front_photo' },
        { field: 'parentNidBack', module: 'riders/parent-nid', apiField: 'parent_nid_back_photo' },
      ] as const;

      const uploadedKeys: Record<string, string> = {};

      for (const target of uploadTargets) {
        const file = uploadedFiles[target.field];
        if (!file) continue;
        const { fileKey } = await uploadFileToAws(file, target.module, apiBaseUrl);
        if (fileKey) {
          uploadedKeys[target.apiField] = fileKey;
        }
      }

      const payload = {
        full_name: data.name,
        phone: data.mobile,
        email: data.email,
        password: data.password,
        guardian_mobile_no: data.guardianMobile,
        bike_type: bikeTypeMap[data.bikeType] || data.bikeType,
        nid_number: data.nidNumber,
        license_no: data.licenseNumber,
        present_address: data.presentAddress,
        permanent_address: data.permanentAddress,
        fixed_salary: parseAmount(data.fixedSalary),
        commission_per_delivery: parseAmount(data.commission),
        ...uploadedKeys,
      };

      const riderResponse = await fetch(`${apiBaseUrl}/riders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });

      if (!riderResponse.ok) {
        throw new Error('Failed to create rider');
      }

      alert('Rider created successfully!');
    } catch (error) {
      console.error('Error creating rider:', error);
      alert('Failed to create rider. Please try again.');
    }
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setUploadedFiles(prev => ({ ...prev, profilePhoto: file }));
    }
  };

  const handleRemoveProfileImage = () => {
    if (profileImage) {
      URL.revokeObjectURL(profileImage);
    }
    setProfileImage(null);
    setUploadedFiles(prev => ({ ...prev, profilePhoto: null }));
  };

  const handleFileUpload = (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      setUploadedFiles(prev => ({ ...prev, [fieldName]: file }));
    }
  };

  const handleRemoveFile = (fieldName: string) => {
    setUploadedFiles(prev => ({ ...prev, [fieldName]: null }));
  };

  const getFileName = (fieldName: string) => {
    return uploadedFiles[fieldName]?.name || '';
  };

  return (
    <div className="p-6 md:p-8 bg-white font-sans text-gray-900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Create Rider</h1>
        <p className="text-sm text-gray-500 mt-1">Rider Management &gt; Create Rider</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Photo Upload Section */}
          <div className="flex flex-col items-center gap-4 mb-8 lg:mb-0 lg:w-1/4">
            <div className="relative w-32 h-32">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <User size={48} className="text-gray-400" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-3 w-full max-w-[200px]">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageUpload}
                />
                <div className="px-4 py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors text-center text-sm shadow-sm">
                  Upload Photo
                </div>
              </label>
              
              <button
                type="button"
                onClick={handleRemoveProfileImage}
                className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm shadow-sm"
                disabled={!profileImage}
              >
                Remove
              </button>
            </div>
          </div>

          {/* Main Form Section */}
          <div className="w-full lg:w-3/4">
            {/* Personal & Vehicle Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Rider's Name *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter rider's name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Rider's License Number *
                </label>
                <input
                  type="text"
                  {...register('licenseNumber', { required: 'License number is required' })}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                    errors.licenseNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter license number"
                />
                {errors.licenseNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.licenseNumber.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Rider's Bike Type *
                </label>
                <Controller
                  name="bikeType"
                  control={control}
                  rules={{ required: 'Bike type is required' }}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        className={`w-full p-3 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors bg-white ${
                          errors.bikeType ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select bike type</option>
                        <option value="Motor Bike">Motor Bike</option>
                        <option value="Bicycle">Bicycle</option>
                        <option value="Scooter">Scooter</option>
                        <option value="Car">Car</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  )}
                />
                {errors.bikeType && (
                  <p className="mt-1 text-sm text-red-600">{errors.bikeType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Rider's Mobile No. *
                </label>
                <input
                  type="tel"
                  {...register('mobile', {
                    required: 'Mobile number is required',
                    pattern: {
                      value: /^\+?[0-9\s\-]+$/,
                      message: 'Invalid mobile number format'
                    }
                  })}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                    errors.mobile ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+8801234567890"
                />
                {errors.mobile && (
                  <p className="mt-1 text-sm text-red-600">{errors.mobile.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Rider's Guardian Mobile No.
                </label>
                <input
                  type="tel"
                  {...register('guardianMobile')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                  placeholder="+8801234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Rider's NID Number *
                </label>
                <input
                  type="text"
                  {...register('nidNumber', { required: 'NID number is required' })}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                    errors.nidNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter NID number"
                />
                {errors.nidNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.nidNumber.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Rider's Email *
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="rider@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Rider's Password *
                </label>
                <input
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Rider's Present Address *
                </label>
                <textarea
                  {...register('presentAddress', { required: 'Present address is required' })}
                  rows={3}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors resize-none ${
                    errors.presentAddress ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter present address"
                />
                {errors.presentAddress && (
                  <p className="mt-1 text-sm text-red-600">{errors.presentAddress.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Rider's Permanent Address
                </label>
                <textarea
                  {...register('permanentAddress')}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors resize-none"
                  placeholder="Enter permanent address"
                />
              </div>
            </div>

            {/* Assignment & Financials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Assign HUB *
                </label>
                <Controller
                  name="hub"
                  control={control}
                  rules={{ required: 'HUB assignment is required' }}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        className={`w-full p-3 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors bg-white ${
                          errors.hub ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select HUB</option>
                        <option value="dhaka-central">Dhaka Central</option>
                        <option value="chittagong">Chittagong</option>
                        <option value="sylhet">Sylhet</option>
                        <option value="rajshahi">Rajshahi</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  )}
                />
                {errors.hub && (
                  <p className="mt-1 text-sm text-red-600">{errors.hub.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Rider's Fixed Salary *
                </label>
                <input
                  type="text"
                  {...register('fixedSalary', { required: 'Fixed salary is required' })}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors font-semibold text-green-600 ${
                    errors.fixedSalary ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="৳ 0"
                />
                {errors.fixedSalary && (
                  <p className="mt-1 text-sm text-red-600">{errors.fixedSalary.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Rider's Commission
                </label>
                <input
                  type="text"
                  {...register('commission')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors font-semibold text-green-600"
                  placeholder="৳ 0"
                />
              </div>
            </div>

            {/* Bank Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Bank Name
                </label>
                <Controller
                  name="bankName"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors bg-white"
                      >
                        <option value="">Select Bank</option>
                        <option value="dhaka-bank">Dhaka Bank</option>
                        <option value="brac-bank">BRAC Bank</option>
                        <option value="dutch-bangla">Dutch Bangla Bank</option>
                        <option value="city-bank">City Bank</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Bank Account No.
                </label>
                <input
                  type="text"
                  {...register('bankAccountNumber')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                  placeholder="Enter account number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Bank Branch Name
                </label>
                <input
                  type="text"
                  {...register('bankBranchName')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                  placeholder="Enter branch name"
                />
              </div>
            </div>

            {/* Document Uploads */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Rider's NID Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <FileUploadComponent
                  label="Front Side of NID"
                  fileName={getFileName('nidFront')}
                  onFileChange={(e) => handleFileUpload('nidFront', e)}
                  onRemove={() => handleRemoveFile('nidFront')}
                />
                <FileUploadComponent
                  label="Back Side of NID"
                  fileName={getFileName('nidBack')}
                  onFileChange={(e) => handleFileUpload('nidBack', e)}
                  onRemove={() => handleRemoveFile('nidBack')}
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Rider's Driving License Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <FileUploadComponent
                  label="Front Side of Driving License"
                  fileName={getFileName('licenseFront')}
                  onFileChange={(e) => handleFileUpload('licenseFront', e)}
                  onRemove={() => handleRemoveFile('licenseFront')}
                />
                <FileUploadComponent
                  label="Back Side of Driving License"
                  fileName={getFileName('licenseBack')}
                  onFileChange={(e) => handleFileUpload('licenseBack', e)}
                  onRemove={() => handleRemoveFile('licenseBack')}
                />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Rider's Parent NID Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUploadComponent
                  label="Front Side of Parent NID"
                  fileName={getFileName('parentNidFront')}
                  onFileChange={(e) => handleFileUpload('parentNidFront', e)}
                  onRemove={() => handleRemoveFile('parentNidFront')}
                />
                <FileUploadComponent
                  label="Back Side of Parent NID"
                  fileName={getFileName('parentNidBack')}
                  onFileChange={(e) => handleFileUpload('parentNidBack', e)}
                  onRemove={() => handleRemoveFile('parentNidBack')}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {isSubmitting ? 'Creating...' : 'Create Rider'}
              </button>
              <button
                type="button"
                onClick={() => console.log('Cancel clicked')}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

interface FileUploadComponentProps {
  label: string;
  fileName: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({
  label,
  fileName,
  onFileChange,
  onRemove,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      
      {fileName ? (
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Upload size={20} className="text-green-600" />
              </div>
              <div className="truncate">
                <p className="text-sm font-medium text-gray-800 truncate">{fileName}</p>
                <p className="text-xs text-gray-500">Uploaded successfully</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onRemove}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>
        </div>
      ) : (
        <label className="cursor-pointer">
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            className="hidden"
            onChange={onFileChange}
          />
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
              <Upload size={24} className="text-gray-600" />
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Click to upload</p>
            <p className="text-xs text-gray-500 text-center">
              PNG, JPEG, PDF (Max 2MB)
            </p>
          </div>
        </label>
      )}
    </div>
  );
};

export default CreateRiderForm;
