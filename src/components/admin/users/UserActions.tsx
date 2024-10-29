import React from 'react';
import { 
  Edit2, Trash2, Lock, Shield, Ban, 
  Mail, RefreshCw, UserX, UserCheck 
} from 'lucide-react';
import { User } from '../../../types/user';
import { useAdmin } from '../../../contexts/AdminContext';

interface UserActionsProps {
  user: User;
  onClose: () => void;
  onDelete: () => void;
}

export default function UserActions({ user, onClose, onDelete }: UserActionsProps) {
  const { updateUser } = useAdmin();

  const handleAction = async (action: string) => {
    try {
      switch (action) {
        case 'suspend':
          await updateUser(user.id, {
            status: {
              ...user.status,
              isSuspended: true,
              suspendedReason: 'Administrative action',
              suspendedUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
            }
          });
          break;
        case 'unsuspend':
          await updateUser(user.id, {
            status: {
              ...user.status,
              isSuspended: false,
              suspendedReason: undefined,
              suspendedUntil: undefined
            }
          });
          break;
        case 'activate':
          await updateUser(user.id, {
            status: {
              ...user.status,
              isActive: true
            }
          });
          break;
        case 'deactivate':
          await updateUser(user.id, {
            status: {
              ...user.status,
              isActive: false
            }
          });
          break;
        case 'resetPassword':
          await updateUser(user.id, {
            requiresPasswordChange: true
          });
          break;
        // Add more actions as needed
      }
      onClose();
    } catch (error) {
      console.error('Failed to perform action:', error);
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1 z-10">
      <button
        onClick={() => {
          // Handle edit
          onClose();
        }}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
      >
        <Edit2 className="h-4 w-4 mr-2" />
        Edit User
      </button>

      <button
        onClick={() => handleAction('resetPassword')}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
      >
        <Lock className="h-4 w-4 mr-2" />
        Reset Password
      </button>

      <button
        onClick={() => {
          // Handle 2FA reset
          onClose();
        }}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
      >
        <Shield className="h-4 w-4 mr-2" />
        Reset 2FA
      </button>

      {user.status.isActive ? (
        <button
          onClick={() => handleAction('deactivate')}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
        >
          <UserX className="h-4 w-4 mr-2" />
          Deactivate
        </button>
      ) : (
        <button
          onClick={() => handleAction('activate')}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
        >
          <UserCheck className="h-4 w-4 mr-2" />
          Activate
        </button>
      )}

      {user.status.isSuspended ? (
        <button
          onClick={() => handleAction('unsuspend')}
          className="flex items-center w-full px-4 py-2 text-sm text-green-500 hover:bg-gray-700"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Remove Suspension
        </button>
      ) : (
        <button
          onClick={() => handleAction('suspend')}
          className="flex items-center w-full px-4 py-2 text-sm text-yellow-500 hover:bg-gray-700"
        >
          <Ban className="h-4 w-4 mr-2" />
          Suspend User
        </button>
      )}

      <button
        onClick={() => {
          // Handle email verification resend
          onClose();
        }}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
      >
        <Mail className="h-4 w-4 mr-2" />
        Resend Verification
      </button>

      <hr className="my-1 border-gray-700" />

      <button
        onClick={onDelete}
        className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-700"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Delete User
      </button>
    </div>
  );
}