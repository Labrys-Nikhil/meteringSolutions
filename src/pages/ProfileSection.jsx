

// import React, { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserProfile, updateUserProfile, uploadAvatar } from '../redux/thunks/profileThunks';
// import { toggleEditMode, clearMessages, selectUserProfile } from '../redux/slice/userSlice';
// import { Camera, Edit3, Save, X, Mail, User, Phone, Calendar, Globe, Linkedin, Github, MapPin, Briefcase } from 'lucide-react';

// const ProfileSection = () => {
//   const dispatch = useDispatch();
//   const user = useSelector(selectUserProfile);
  
//   const {
//     loading,
//     updating,
//     uploadingAvatar,
//     error,
//     success,
//     isEditing,
//   } = useSelector((state) => state.profile);

//   const fileInputRef = useRef();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     bio: '',
//     dateOfBirth: '',
//     website: '',
//     socialLinks: {
//       twitter: '',
//       linkedin: '',
//       github: '',
//     }
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     console.log('user data is fetched for the profile');
//     dispatch(fetchUserProfile());
//   }, [dispatch]);

//   // Fix: Ensure formData is properly initialized when user data is available
//   useEffect(() => {
//     if (user && Object.keys(user).length > 0) {
//       setFormData({
//         firstName: user.firstName || '',
//         lastName: user.lastName || '',
//         email: user.email || '',
//         phone: user.phone || '',
//         bio: user.bio || '',
//         dateOfBirth: user.dateOfBirth || '',
//         website: user.website || '',
//         socialLinks: {
//           twitter: user.socialLinks?.twitter || '',
//           linkedin: user.socialLinks?.linkedin || '',
//           github: user.socialLinks?.github || '',
//         }
//       });
//     }
//   }, [user]);

//   useEffect(() => {
//     if (error || success) {
//       const timer = setTimeout(() => dispatch(clearMessages()), 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [error, success, dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log('Field changed:', name, value); // Debug log
    
//     if (name.includes('.')) {
//       const [key, sub] = name.split('.');
//       setFormData((prev) => ({
//         ...prev,
//         [key]: { 
//           ...prev[key], 
//           [sub]: value 
//         },
//       }));
//     } else {
//       setFormData((prev) => ({ 
//         ...prev, 
//         [name]: value 
//       }));
//     }
//   };

//   const handleSave = async () => {
//     console.log('Saving profile data:---------->', formData); // Debug log
//     try {
//       await dispatch(updateUserProfile(formData)).unwrap();
//       dispatch(toggleEditMode()); // Exit edit mode after successful save
//     } catch (error) {
//       console.error('Save failed:', error);
//     }
//   };

//   const handleCancel = () => {
//     // Reset form data to original user data
//     if (user) {
//       setFormData({
//         firstName: user.firstName || '',
//         lastName: user.lastName || '',
//         email: user.email || '',
//         phone: user.phone || '',
//         bio: user.bio || '',
//         dateOfBirth: user.dateOfBirth || '',
//         website: user.website || '',
//         socialLinks: {
//           twitter: user.socialLinks?.twitter || '',
//           linkedin: user.socialLinks?.linkedin || '',
//           github: user.socialLinks?.github || '',
//         }
//       });
//     }
//     dispatch(toggleEditMode());
//   };

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.size <= 5 * 1024 * 1024 && file.type.startsWith('image/')) {
//       dispatch(uploadAvatar(file));
//     } else {
//       alert('Please select a valid image file under 5MB');
//     }
//   };

//   const Field = ({ label, name, value, type = 'text', Icon, placeholder, readOnly = false }) => (
//     <div className="group">
//       <label className="block body-xs  font-semibold text-gray-700 mb-2 flex items-center gap-2">
//         {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
//         {label}
//         {readOnly && <span className="body-xs  text-gray-400 italic">(Read-only)</span>}
//       </label>
//       {isEditing && !readOnly ? (
//         <input
//           name={name}
//           value={value || ''}
//           onChange={handleChange}
//           placeholder={placeholder}
//           className="w-full px-4 py-3 border border-gray-200 rounded-xl body-xs  focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-300"
//           type={type}
//         />
//       ) : (
//         <div className={`px-4 py-3 ${readOnly ? 'bg-gray-100' : 'bg-gray-50'} rounded-xl border border-gray-100`}>
//           <p className="text-gray-800 body-xs ">
//             {value || <span className="text-gray-400 italic">Not specified</span>}
//           </p>
//         </div>
//       )}
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600 font-medium">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-blue-300/10 py-8 px-4">
//       <div className="max-w-5xl mx-auto">
//         {/* Header Card */}
//         <div className="bg-white rounded-2xl shadow-md mb-8 overflow-hidden">
//           <div className="h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 relative">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-500"></div>
//           </div>
          
//           <div className="px-8 pb-8">
//             <div className="flex flex-col lg:flex-row lg:items-end gap-6 -mt-16 relative z-10">
//               {/* Avatar Section */}
//               <div className="flex-shrink-0">
//                 <div className="relative">
//                   <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-white flex items-center justify-center">
//                     {user?.avatar ? (
//                       <img
//                         src={user.avatar}
//                         alt="Profile"
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.target.style.display = 'none';
//                           e.target.nextSibling.style.display = 'flex';
//                         }}
//                       />
//                     ) : null}
//                     <div className={`w-full h-full flex items-center justify-center bg-gray-100 ${user?.avatar ? 'hidden' : 'flex'}`}>
//                       <User className="w-12 h-12 text-gray-400" />
//                     </div>
//                   </div>
//                   {isEditing && (
//                     <button
//                       onClick={() => fileInputRef.current?.click()}
//                       disabled={uploadingAvatar}
//                       className="absolute -bottom-2 -right-2 p-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50"
//                     >
//                       <Camera className="w-5 h-5" />
//                     </button>
//                   )}
//                 </div>
//                 <input 
//                   type="file" 
//                   className="hidden" 
//                   ref={fileInputRef} 
//                   onChange={handleAvatarChange}
//                   accept="image/*"
//                 />
//               </div>

//               {/* Profile Info */}
//               <div className="flex-1 lg:mb-4">
//                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//                   <div>
//                     <h1 className="heading-xl   font-bold text-gray-900 mb-2">
//                       {formData.firstName && formData.lastName 
//                         ? `${formData.firstName.toUpperCase()} ${formData.lastName.toUpperCase()}` 
//                         : 'Your Name'}
//                     </h1>
//                     <p className="text-gray-600 body-md   mb-4">{formData.bio || 'Professional Profile'}</p>
//                     <div className="flex flex-wrap gap-4 body-xs  text-gray-500">
//                       {formData.email && (
//                         <div className="flex items-center gap-1">
//                           <Mail className="w-4 h-4" />
//                           {formData.email}
//                         </div>
//                       )}
//                       {formData.phone && (
//                         <div className="flex items-center gap-1">
//                           <Phone className="w-4 h-4" />
//                           {formData.phone}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex gap-3">
//                     {!isEditing ? (
//                       <button
//                         onClick={() => dispatch(toggleEditMode())}
//                         className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2"
//                       >
//                         <Edit3 className="w-4 h-4" />
//                         Edit Profile
//                       </button>
//                     ) : (
//                       <div className="flex gap-3">
//                         <button 
//                           onClick={handleCancel}
//                           className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 flex items-center gap-2"
//                         >
//                           <X className="w-4 h-4" />
//                           Cancel
//                         </button>
//                         <button
//                           disabled={updating}
//                           onClick={handleSave}
//                           className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2"
//                         >
//                           <Save className="w-4 h-4" />
//                           {updating ? 'Saving...' : 'Save Changes'}
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Personal Information */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-md p-8">
//               <div className="flex items-center gap-3 mb-8">
//                 <div className="p-2 bg-indigo-100 rounded-lg">
//                   <User className="w-5 h-5 text-indigo-600" />
//                 </div>
//                 <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Field 
//                   label="First Name" 
//                   name="firstName" 
//                   value={formData.firstName} 
//                   Icon={User}
//                   placeholder="Enter your first name"
//                 />
//                 <Field 
//                   label="Last Name" 
//                   name="lastName" 
//                   value={formData.lastName} 
//                   Icon={User}
//                   placeholder="Enter your last name"
//                 />
//                 <Field 
//                   label="Email Address" 
//                   name="email" 
//                   value={formData.email} 
//                   type="email" 
//                   Icon={Mail}
//                   placeholder="your.email@example.com"
//                   readOnly={true}
//                 />
//                 <Field 
//                   label="Phone Number" 
//                   name="phone" 
//                   value={formData.phone} 
//                   type="tel" 
//                   Icon={Phone}
//                   placeholder="+1 (555) 123-4567"
//                 />
//                 <Field 
//                   label="Date of Birth" 
//                   name="dateOfBirth" 
//                   value={formData.dateOfBirth?.split('T')[0]} 
//                   type="date" 
//                   Icon={Calendar}
//                 />
//                 <Field 
//                   label="Website" 
//                   name="website" 
//                   value={formData.website} 
//                   type="url" 
//                   Icon={Globe}
//                   placeholder="https://yourwebsite.com"
//                 />
//               </div>

//               {/* Bio Section */}
//               <div className="mt-8 pt-8 border-t border-gray-100">
//                 <label className="block body-xs  font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                   <Briefcase className="w-4 h-4 text-indigo-500" />
//                   Professional Bio
//                 </label>
//                 {isEditing ? (
//                   <textarea
//                     name="bio"
//                     value={formData.bio || ''}
//                     onChange={handleChange}
//                     placeholder="Tell us about yourself, your role, and what you're passionate about..."
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl body-xs  focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-300 resize-none"
//                     rows="4"
//                   />
//                 ) : (
//                   <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
//                     <p className="text-gray-800 body-xs  leading-relaxed">
//                       {formData.bio || <span className="text-gray-400 italic">No bio added yet</span>}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Social Links & Additional Info */}
//           <div className="space-y-8">
//             {/* Social Links */}
//             <div className="bg-white rounded-2xl shadow-md p-8">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-2 bg-blue-100 rounded-lg">
//                   <Globe className="w-5 h-5 text-blue-600" />
//                 </div>
//                 <h2 className="text-lg font-bold text-gray-900">Social Profiles</h2>
//               </div>

//               <div className="space-y-6">
//                 <Field 
//                   label="LinkedIn Profile" 
//                   name="socialLinks.linkedin" 
//                   value={formData.socialLinks?.linkedin} 
//                   Icon={Linkedin}
//                   placeholder="https://linkedin.com/in/username"
//                 />
//                 <Field 
//                   label="GitHub Profile" 
//                   name="socialLinks.github" 
//                   value={formData.socialLinks?.github} 
//                   Icon={Github}
//                   placeholder="https://github.com/username"
//                 />
//               </div>
//             </div>

//             {/* Quick Stats */}
//             <div className="bg-white rounded-2xl shadow-md p-8">
//               <h3 className="text-lg font-bold text-gray-900 mb-6">Profile Completion</h3>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="body-xs  text-gray-600">Profile Info</span>
//                   <span className="body-xs  font-semibold text-indigo-600">
//                     {Math.round(Object.values(formData).filter(val => 
//                       val && (typeof val === 'string' ? val.trim() : true)
//                     ).length / 8 * 100)}%
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
//                     style={{ 
//                       width: `${Math.round(Object.values(formData).filter(val => 
//                         val && (typeof val === 'string' ? val.trim() : true)
//                       ).length / 8 * 100)}%` 
//                     }}
//                   ></div>
//                 </div>
//                 <p className="body-xs  text-gray-500">Complete your profile to unlock all features</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Status Messages */}
//         {(error || success) && (
//           <div className="fixed bottom-6 right-6 z-50">
//             {error && (
//               <div className="bg-red-500 text-white px-6 py-4 rounded-md shadow-md mb-4 flex items-center gap-3">
//                 <X className="w-5 h-5" />
//                 <span className="font-medium">{error}</span>
//               </div>
//             )}
//             {success && (
//               <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
//                 <Save className="w-5 h-5" />
//                 <span className="font-medium">{success}</span>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfileSection;





















import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile, uploadAvatar } from '../redux/thunks/profileThunks';
import { toggleEditMode, clearMessages, selectUserProfile } from '../redux/slice/userSlice';
import { Camera, Edit3, Save, X, Mail, User, Phone, Calendar, Globe, Linkedin, Github, Briefcase, Shield, Key } from 'lucide-react';

const ProfileSection = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);
  
  const {
    loading,
    updating,
    uploadingAvatar,
    error,
    success,
    isEditing,
  } = useSelector((state) => state.profile);

  const fileInputRef = useRef();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    dateOfBirth: '',
    website: '',
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: '',
    }
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        dateOfBirth: user.dateOfBirth || '',
        website: user.website || '',
        socialLinks: {
          twitter: user.socialLinks?.twitter || '',
          linkedin: user.socialLinks?.linkedin || '',
          github: user.socialLinks?.github || '',
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => dispatch(clearMessages()), 4000);
      return () => clearTimeout(timer);
    }
  }, [error, success, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [key, sub] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [key]: { 
          ...prev[key], 
          [sub]: value 
        },
      }));
    } else {
      setFormData((prev) => ({ 
        ...prev, 
        [name]: value 
      }));
    }
  };

  const handleSave = async () => {
    try {
      await dispatch(updateUserProfile(formData)).unwrap();
      dispatch(toggleEditMode());
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        dateOfBirth: user.dateOfBirth || '',
        website: user.website || '',
        socialLinks: {
          twitter: user.socialLinks?.twitter || '',
          linkedin: user.socialLinks?.linkedin || '',
          github: user.socialLinks?.github || '',
        }
      });
    }
    dispatch(toggleEditMode());
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024 && file.type.startsWith('image/')) {
      dispatch(uploadAvatar(file));
    } else {
      alert('Please select a valid image file under 5MB');
    }
  };

  const Field = ({ label, name, value, type = 'text', Icon, placeholder, readOnly = false }) => (
    <div className="space-y-2">
      <label className="block body-sm   font-medium text-gray-700 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-gray-500" />}
        {label}
        {readOnly && <span className="body-xs  text-gray-500">(Read-only)</span>}
      </label>
      {isEditing && !readOnly ? (
        <input
          name={name}
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg body-sm   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type={type}
        />
      ) : (
        <div className={`px-3 py-2 ${readOnly ? 'bg-gray-50' : 'bg-gray-50'} rounded-lg border border-gray-200`}>
          <p className="text-gray-800 body-sm  ">
            {value || <span className="text-gray-400 italic">Not specified</span>}
          </p>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-2 sm:py-4">
      <div className=" w-full mx-auto px-2 sm:px-4 lg:px-6">
        
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
          {/* Cover Area */}
          <div className="h-16 sm:h-20"></div>
          
          <div className="px-4 sm:px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-16">
              
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-sm bg-white flex items-center justify-center">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full flex items-center justify-center bg-gray-100 ${user?.avatar ? 'hidden' : 'flex'}`}>
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                  </div>
                </div>
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingAvatar}
                    className="absolute -bottom-1 -right-1 p-2 bg-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                )}
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleAvatarChange}
                  accept="image/*"
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1 min-w-0 ">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between items-center gap-4">
                  <div className="min-w-0">
                    <h1 className="heading-xl   sm:text-2xl font-semibold text-gray-900 truncate">
                      {formData.firstName && formData.lastName 
                        ? `${formData.firstName} ${formData.lastName}` 
                        : 'Your Name'}
                    </h1>
                    {formData.bio && (
                      <p className="text-gray-600 mt-1 body-sm   sm:text-base">{formData.bio}</p>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 body-sm   text-gray-500">
                      {formData.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{formData.email}</span>
                        </div>
                      )}
                      {formData.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {formData.phone}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 w-full sm:w-auto">
                    {!isEditing ? (
                      <button
                        onClick={() => dispatch(toggleEditMode())}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 w-full sm:w-auto"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button 
                          onClick={handleCancel}
                          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 flex-1 sm:flex-none"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                        <button
                          disabled={updating}
                          onClick={handleSave}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 flex-1 sm:flex-none"
                        >
                          <Save className="w-4 h-4" />
                          {updating ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        

          {/* Personal Information */}
{/* Personal Information */}
<div className="lg:col-span-2 flex justify-center">
  <div className="bg-white rounded-lg shadow-sm p-6 w-full max-w-2xl">
    <div className="flex items-center gap-2 mb-6">
      <User className="w-5 h-5 text-gray-600" />
      <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
    </div>

    {/* Input fields in grid (stack on small, 2 cols on md+) */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <Field 
        label="First Name" 
        name="firstName" 
        value={formData.firstName} 
        placeholder="Enter your first name"
      />
      <Field 
        label="Last Name" 
        name="lastName" 
        value={formData.lastName} 
        placeholder="Enter your last name"
      />
      <Field 
        label="Email Address" 
        name="email" 
        value={formData.email} 
        type="email" 
        placeholder="your.email@example.com"
        readOnly={true}
      />
      <Field 
        label="Phone Number" 
        name="phone" 
        value={formData.phone} 
        type="tel" 
        placeholder="+1 (555) 123-4567"
      />
      {/* <Field 
        label="Date of Birth" 
        name="dateOfBirth" 
        value={formData.dateOfBirth?.split('T')[0]} 
        type="date"
      /> */}
    </div>

    {/* Bio Section */}
    <div className="space-y-2">
      <label className="block body-sm   font-medium text-gray-700 flex items-center gap-2">
        <Briefcase className="w-4 h-4 text-gray-500" />
        Bio
      </label>
      {isEditing ? (
        <textarea
          name="bio"
          value={formData.bio || ''}
          onChange={handleChange}
          placeholder="Tell us about yourself..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg body-sm   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows="4"
        />
      ) : (
        <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-800 body-sm  ">
            {formData.bio || <span className="text-gray-400 italic">No bio added yet</span>}
          </p>
        </div>
      )}
    </div>
  </div>
</div>


        </div>

           {/* Password Section */}
      {/* <section className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center mb-6">
          <Lock className="text-blue-600 w-5 h-5 mr-2" />
          <h2 className="heading-xl   font-semibold text-gray-800">Password & Security</h2>
        </div>
        
        <form onSubmit={""}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block body-sm   font-medium text-gray-700 mb-1">Current Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="currentPassword"
                  value={""}
                  onChange={""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <Lock className="absolute right-3 top-2.5 text-gray-400 w-4 h-4" />
              </div>
            </div>
            <div>
              <label className="block body-sm   font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="newPassword"
                  value={""}
                  onChange={""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <Lock className="absolute right-3 top-2.5 text-gray-400 w-4 h-4" />
              </div>
            </div>
            <div>
              <label className="block body-sm   font-medium text-gray-700 mb-1">Confirm New Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={""}
                  onChange={""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <Lock className="absolute right-3 top-2.5 text-gray-400 w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="flex items-center mb-4 p-3 bg-blue-50 rounded-lg">
            <Shield className="text-blue-600 mr-3 flex-shrink-0" />
            <span className="body-sm   text-gray-700">
              Use 8+ characters with a mix of uppercase, lowercase, numbers, and symbols
            </span>
          </div>
          <button
            id="password-submit"
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center"
          >
            <Key className="w-4 h-4 mr-2" /> Change Password
          </button>
        </form>
      </section> */}

        {/* Status Messages */}
        {(error || success) && (
          <div className="fixed bottom-4 right-4 z-50">
            {error && (
              <div className="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg mb-2 flex items-center gap-2">
                <X className="w-4 h-4" />
                <span className="body-sm  ">{error}</span>
              </div>
            )}
            {success && (
              <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
                <Save className="w-4 h-4" />
                <span className="body-sm  ">{success}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;