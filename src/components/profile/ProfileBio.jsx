import React from 'react';

const ProfileBio = ({ value, isEditing, handleChange }) => (
  <div className="mt-6">
    <label className="body-sm   font-medium text-gray-700">Bio</label>
    {isEditing ? (
      <textarea
        name="bio"
        value={value || ''}
        onChange={handleChange}
        className="w-full mt-1 p-2 border rounded body-sm  "
        rows="3"
      />
    ) : (
      <p className="text-gray-800 mt-1 body-sm  ">{value || '—'}</p>
    )}
  </div>
);

export default ProfileBio;