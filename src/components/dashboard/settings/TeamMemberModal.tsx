import React, { useState } from 'react';
import { Users, UserPlus, Mail, Shield, Trash2, Check } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending' | 'inactive';
  joinedAt?: string;
}

interface TeamMemberModalProps {
  show: boolean;
  onClose: () => void;
}

export default function TeamMemberModal({ show, onClose }: TeamMemberModalProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'active',
      joinedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Member',
      status: 'pending'
    }
  ]);

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [error, setError] = useState('');

  if (!show) return null;

  const handleInvite = () => {
    if (!inviteEmail) {
      setError('Email is required');
      return;
    }

    if (!inviteEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Invalid email address');
      return;
    }

    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole === 'admin' ? 'Admin' : 'Member',
      status: 'pending'
    };

    setTeamMembers(prev => [...prev, newMember]);
    setInviteEmail('');
    setError('');
  };

  const handleRemoveMember = (memberId: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const handleResendInvite = (memberEmail: string) => {
    // Simulate resending invite
    console.log('Resending invite to:', memberEmail);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-cyan-500" />
            <h3 className="text-lg font-semibold text-white">Team Members</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            Close
          </button>
        </div>

        {/* Invite Form */}
        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
          <h4 className="text-white font-medium mb-4">Invite Team Member</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => {
                    setInviteEmail(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-10 pr-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter email"
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Role
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="member">Team Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>
          <button
            onClick={handleInvite}
            className="mt-4 flex items-center px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Send Invitation
          </button>
        </div>

        {/* Team Members List */}
        <div className="space-y-4">
          {teamMembers.map(member => (
            <div key={member.id} className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">{member.name}</h4>
                  <p className="text-sm text-gray-400">{member.email}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    member.status === 'active' ? 'bg-green-500/10 text-green-500' :
                    member.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </span>
                  <span className="text-cyan-500">{member.role}</span>
                  <div className="flex items-center space-x-2">
                    {member.status === 'pending' && (
                      <button
                        onClick={() => handleResendInvite(member.email)}
                        className="p-1 hover:bg-gray-600 rounded"
                        title="Resend Invite"
                      >
                        <Mail className="h-4 w-4 text-gray-400" />
                      </button>
                    )}
                    {member.status === 'active' && (
                      <div className="flex items-center text-xs text-gray-400">
                        <Check className="h-4 w-4 mr-1" />
                        Joined {new Date(member.joinedAt!).toLocaleDateString()}
                      </div>
                    )}
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="p-1 hover:bg-gray-600 rounded"
                      title="Remove Member"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}