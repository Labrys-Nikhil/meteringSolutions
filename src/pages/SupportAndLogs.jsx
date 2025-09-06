
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Plus, Eye, Edit, Trash2, Search, Filter, Clock, User, AlertCircle, CheckCircle,
  Circle, MessageSquare, Mail, Phone, Calendar, Tag, Users, Settings,
  FileText,
  X,
  Check,
  RotateCcw,
} from "lucide-react";
import { selectSelectedTicket, selectTickets } from "../redux/slice/ticketSlice";
import { fetchTicketsByUserId, addComments, createTicket, reopenTicket, changePriority } from "../redux/thunks/ticketThunks";
import { selectUserId, selectUserRole } from "../redux/slice/authSlice";
import Modal from "../components/Modal";
import { toast } from "react-toastify";
import { changeStatus, closeTicket } from "../redux/thunks/ticketThunks";
import { selectIndividualTicket } from '../redux/slice/ticketSlice'


const TicketingSystem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingTicketId, setDeletingTicketId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [actionType, setActionType] = useState("");
  const [processing, setProcessing] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [formData, setFormData] = useState({});

  const [createTicketData, setCreateTicketData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "OPEN",
    category: "Technical"
  });
  const [createTicketErrors, setCreateTicketErrors] = useState({});

  const tickets = useSelector(selectTickets);
  const selectedTicket = useSelector(selectSelectedTicket);
  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const dispatch = useDispatch();
  const priorities = ["Low", "Medium", "High", "Critical"];
  const statuses = ["Open", "In Progress", "Resolved", "Closed"];
  const categories = ["Technical", "Billing", "Consultation", "Complaint", "Other"];
  const assignees = ["John Doe", "Jane Smith", "Bob Wilson", "Alice Johnson"];

  useEffect(() => {
    dispatch(fetchTicketsByUserId(userId));
  }, [userId, dispatch]);

  // Add this useEffect to update selectedTicket when tickets change
  useEffect(() => {
    if (selectedTicket && tickets) {
      const updatedTicket = tickets.find(t => t._id === selectedTicket._id);
      if (updatedTicket) {
        dispatch(selectIndividualTicket(updatedTicket));
      }
    }
  }, [tickets, selectedTicket]);

  useEffect(() => {
    setFormData({});
  }, [actionType]);


  const isAdmin = userRole === "admin" || userRole === "superAdmin";

  // Action templates only for admin users
  const actionTemplates = isAdmin ? {
    update_status: {
      name: 'Update Status',
      description: 'Change the status of the ticket',
      fields: [
        {
          name: 'newStatus',
          label: 'New Status',
          type: 'select',
          options: statuses
        },
        {
          name: 'notes',
          label: 'Notes',
          type: 'textarea',
          placeholder: 'Add any notes or comments about the status change'
        }
      ]
    },
    update_priority: {
      name: 'Update Priority',
      description: 'Change the priority level',
      fields: [
        {
          name: 'newPriority',
          label: 'New Priority',
          type: 'select',
          options: priorities
        },
        {
          name: 'notes',
          label: 'Notes',
          type: 'textarea',
          placeholder: 'Add any notes or comments about the status change'
        }
      ]
    },
    // reassign_ticket: {
    //   name: 'Reassign Ticket',
    //   description: 'Assign ticket to a different team member',
    //   fields: [
    //     {
    //       name: 'newAssignee',
    //       label: 'Assign To',
    //       type: 'select',
    //       options: assignees
    //     }
    //   ]
    // },

  } : {};

  const getPriorityColor = (priority) => {
    const v = priority?.toLowerCase();
    switch (v) {
      case "critical": return "bg-red-600";
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status) => {
    const v = status?.toLowerCase();
    switch (v) {
      case "open": return "bg-blue-500";
      case "in progress": return "bg-orange-500";
      case "resolved": return "bg-green-500";
      case "closed": return "bg-gray-500";
      case "cscalated": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    const v = status.toLowerCase();
    switch (status) {
      case "open": return <Circle color="white" className="w-4 h-4 " />;
      case "in progress": return <Clock color="white" className="w-4 h-4" />;
      case "resolved": return <CheckCircle color="white" className="w-4 h-4" />;
      case "closed": return <CheckCircle color="white" className="w-4 h-4" />;
      default: return <Circle color="white" className="w-4 h-4" />;
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "Just now";
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  };

  const filteredTickets = tickets?.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket?.createdby?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket?.ticketId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || ticket.status === filterStatus;
    const matchesPriority = filterPriority === "All" || ticket.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateTicket = () => setShowCreateForm(true);

  const handleCreateTicketChange = (field, value) => {
    setCreateTicketData(prev => ({ ...prev, [field]: value }));
    if (createTicketErrors[field]) {
      setCreateTicketErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSelectTicket = (ticketId) => {
    const filteredTicket = tickets.filter(t => t.ticketId === ticketId);
    console.log('filtered ticket in the handle ticket--------->', filteredTicket);
    dispatch(selectIndividualTicket(filteredTicket[0]));//setting thet slice wit this ticket.
  }

  const validateCreateTicketForm = () => {
    const errors = {};
    if (!createTicketData.title.trim()) errors.title = 'Title is required';
    if (!createTicketData.description.trim()) errors.description = 'Description is required';
    if (!createTicketData.description.trim()) errors.customer = 'Customer name is required';
    setCreateTicketErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateTicketSubmit = async () => {
    if (!validateCreateTicketForm()) return;
    setIsCreatingTicket(true);
    // API call 
    dispatch(createTicket(createTicketData)).unwrap()
      .then(() => toast.success('ticket is created successfully'))
      .catch(() => toast.error("Failed to create ticket"));
    toast.success('ticket is created successfully');
    setTimeout(() => {
      setIsCreatingTicket(false);
      setShowCreateForm(false);
      setCreateTicketData({
        title: "",
        description: "",
        priority: "Medium",
        status: "Open",
        category: "Technical",
      });
    }, 2000);
  };

  const handleAction = async (formData) => {
    if (!selectedTicket || !actionType) return;

    console.log("chacking------>", formData, actionType)
    setProcessing(true);
    // API call 
    //dispatch()
    if (actionType === 'update_status') {
      console.log("Updating status for ticket:", selectedTicket._id, formData.newStatus, formData.notes);
      dispatch(changeStatus({ id: selectedTicket._id, status: formData?.newStatus?.toUpperCase(), notes: formData.notes })).unwrap()
        .then(() => toast.success(`Ticket status updated to ${formData.newStatus}`))
        .catch(() => toast.error("Failed to updated status"));

    } else if (actionType === 'update_priority') {
      console.log("Updating status for ticket:", selectedTicket._id, formData.newPriority, formData.notes);
      dispatch(changePriority({ id: selectedTicket._id, priority: formData?.newPriority?.toUpperCase(), notes: formData.notes })).unwrap()
        .then(() => toast.success(`Ticket status updated to ${formData.newPriority}`))
        .catch(() => toast.error("Failed to updated priority"));

    }
    setTimeout(() => {
      setProcessing(false);
      setActionType("");
    }, 2000);
  };

  const handleDeleteTicket = (ticketId) => {
    if (!isAdmin) return; // Only admins can delete tickets
    setDeletingTicketId(ticketId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (!deletingTicketId) return;
    setIsDeleting(true);
    // API call to delete ticket would go here
    setTimeout(() => {
      setShowDeleteConfirm(false);
      setDeletingTicketId(null);
      setIsDeleting(false);
    }, 1500);
  };

  const addComment = () => {
    if (!newComment.trim() || !selectedTicket) return;

    //call the dispatch for updating the ticket with new comment
    console.log("Adding comment to ticket:", selectedTicket._id, newComment.trim());
    // dispatch(addComments({id:selectedTicket._id, comment: newComment.trim()}));
    dispatch(addComments({ ticketId: selectedTicket._id, data: { comment: newComment } })).unwrap()
      .then(() => toast.success(`New comment is added!`))
      .catch(() => toast.error("Failed to updated priority"));
    setNewComment("");
  };

  const getTicketStats = () => {
    const stats = {
      total: tickets?.length,
      open: tickets?.filter(t => t.status.toLowerCase() === 'open').length,
      inProgress: tickets?.filter(t => t.status.toLowerCase() === 'in progress').length,
      resolved: tickets?.filter(t => t.status.toLowerCase() === 'resolved').length,
      closed: tickets?.filter(t => t.status.toLowerCase() === 'closed').length
    };
    return stats;
  };

  const stats = getTicketStats();

  const handleReOpenClick = (e) => {
    e.preventDefault();
    if (!selectedTicket || selectedTicket.status !== "CLOSED") return;
    console.log("Reopening ticket:=========", selectedTicket._id);
    dispatch(reopenTicket(selectedTicket._id)).unwrap()
      .then(() => toast.success(`Ticket is ReOpend`))
      .catch(() => toast.error("Failed to ReOpend ticket"));
  }

  const handleCloseClick = (e) => {
    e.preventDefault();
    if (!selectedTicket || selectedTicket.status !== "OPEN") return;
    console.log("Closing ticket:", selectedTicket._id);
    // Dispatch close ticket action
    dispatch(closeTicket(selectedTicket._id)).unwrap()
      .then(() => toast.success(`Tickt is closed successfully`))
      .catch(() => toast.error("Failed to updated priority"));
  };

  return (
    <div className="p-6">
      <div className="p-2">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {isAdmin ? "Support Ticketing System" : "My Support Tickets"}
                </h1>
                <p className="text-gray-600">
                  {isAdmin ? "Manage customer support tickets and inquiries" : "View your support tickets and submit new requests"}
                </p>
              </div>
              {
                !isAdmin && <button
                  onClick={handleCreateTicket}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  New Ticket
                </button>
              }
            </div>
          </div>

          {/* Stats Cards - Only show for admin users */}
          {isAdmin && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="body-xs  font-medium text-gray-500">Total Tickets</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Tag className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="body-xs  font-medium text-gray-500">Open</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.open}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Circle className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="body-xs  font-medium text-gray-500">In Progress</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.inProgress}</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="body-xs  font-medium text-gray-500">Resolved</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.resolved}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="body-xs  font-medium text-gray-500">Closed</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.closed}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-full">
                    <CheckCircle className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ticket List and Detail Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ticket List (Left Side) */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4 m-2">
              <div className="bg-white p-4 mb-4">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Filters - Only show for admin users */}
                {isAdmin && (
                  <div className="flex space-x-2 mb-4">
                    <div className="flex-1">
                      <label className="block body-xs  font-medium mb-1">Status</label>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full body-xs    border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="All">All Statuses</option>
                        {statuses.map(status => (
                          <option key={status} value={status.toUpperCase()}>{status}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block body-xs  font-medium mb-1">Priority</label>
                      <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="body-xs    w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option className='body-xs   ' value="All">All Priorities</option>
                        {priorities.map(priority => (
                          <option className='body-xs   ' key={priority} value={priority.toUpperCase()}>{priority}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 max-h-[80vh] overflow-y-auto p-3">
                {filteredTickets && filteredTickets.length > 0 ? (
                  filteredTickets.reverse().map(ticket => (
                    <div
                      key={ticket.ticketId}
                      onClick={() => handleSelectTicket(ticket.ticketId)}
                      className={`rounded-lg shadow-sm border p-4 cursor-pointer transition-colors ${selectedTicket?.ticketId === ticket?.ticketId
                        ? 'border-blue-500 ring-1 ring-blue-200 bg-green-300/10'
                        : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-600 line-clamp-1">{ticket.title}</h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full body-xs  font-medium ${getPriorityColor(ticket.priority)} text-white`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <div className="flex items-center body-xs  text-gray-600 mb-2">
                        <span className="flex items-center mr-3 font-semibold">
                          <User color='lightblue' className="h-5 w-5 mr-1" />
                          {ticket?.createdBy?.name?.toUpperCase() || 'Unassigned'}
                        </span>
                      </div>
                      <div className="flex items-center body-xs  text-gray-600 mb-2">
                        <span className="flex items-center">
                          <Tag color='green' className="h-5 w-5 mr-1 " />
                          {ticket?.ticketId}
                        </span>
                      </div>
                      <div className="flex items-center justify-between body-xs  text-gray-500">
                        <span className={`flex items-center ${getStatusColor(ticket.status)} px-1 py-1 rounded-full`}>
                          {getStatusIcon(ticket.status)}
                          <span className="ml-1 text-white">{ticket.status}</span>
                        </span>
                        <span>{formatTimeAgo(ticket.updatedAt)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="heading-md font-medium text-gray-900 mb-2">No Tickets Found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Ticket Details and Action Panel (Right Side) */}
            <div className="lg:col-span-2 mt-2">
              {selectedTicket ? (
                <TicketDetailsPanel
                  selectedTicket={selectedTicket}
                  actionType={actionType}
                  setActionType={setActionType}
                  actionTemplates={actionTemplates}
                  handleAction={handleAction}
                  handleReOpenClick={handleReOpenClick}
                  handleCloseClick={handleCloseClick}
                  processing={processing}
                  getPriorityColor={getPriorityColor}
                  getStatusColor={getStatusColor}
                  formatTimeAgo={formatTimeAgo}
                  newComment={newComment}
                  setNewComment={setNewComment}
                  addComment={addComment}
                  handleDeleteTicket={handleDeleteTicket}
                  isAdmin={isAdmin}
                />
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="heading-md font-medium text-gray-900 mb-2">Select a Ticket</h3>
                  <p className="text-gray-600">Choose a ticket from the list to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Create Ticket Modal */}
        {showCreateForm && (
          <CreateTicketModal
            createTicketData={createTicketData}
            createTicketErrors={createTicketErrors}
            setShowCreateForm={setShowCreateForm}
            handleCreateTicketChange={handleCreateTicketChange}
            handleCreateTicketSubmit={handleCreateTicketSubmit}
            isCreatingTicket={isCreatingTicket}
            categories={categories}
            priorities={priorities}
            statuses={statuses}
            assignees={assignees}
            isAdmin={isAdmin}
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <DeleteConfirmation
            ticket={tickets.find(t => t.id === deletingTicketId)}
            setShowDeleteConfirm={setShowDeleteConfirm}
            confirmDelete={confirmDelete}
            isDeleting={isDeleting}
          />
        )}
      </div>
    </div>
  );
};

export default TicketingSystem;

const TicketDetailsPanel = ({
  selectedTicket,
  actionType,
  setActionType,
  actionTemplates,
  handleReOpenClick,
  handleCloseClick,
  handleAction,
  processing,
  getPriorityColor,
  getStatusColor,
  formatTimeAgo,
  newComment,
  setNewComment,
  addComment,
  handleDeleteTicket,
  isAdmin
}) => {
  const [formData, setFormData] = useState({});

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    console.log('inside the handle submit of the updating staus and priority Submitting form data:', formData);
    e.preventDefault();
    handleAction(formData);
    setFormData({});
  };

  if (!selectedTicket) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-sm border border-gray-200 p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
        <div className="bg-white rounded-full p-3 shadow-sm mb-3">
          <MessageSquare className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="heading-lg font-semibold text-gray-900 mb-2">No Ticket Selected</h3>
        <p className="body-xs    text-gray-600 max-w-md">
          Select a ticket from the list to view details and perform actions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Ticket Card */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-0">
            <div className="flex-1">
              <h2 className="heading-lg md:heading-xl font-bold text-gray-900 mb-2">{selectedTicket.title}</h2>
              <div className="flex flex-wrap items-center gap-2 body-xs  text-gray-600">
                <span className="flex items-center bg-white px-2 py-1 rounded-full shadow-sm">
                  <Tag className="h-3 w-3 mr-1 text-blue-500" />
                  {selectedTicket.ticketId}
                </span>
                <span className="flex items-center bg-white px-2 py-1 rounded-full shadow-sm">
                  <Calendar className="h-3 w-3 mr-1 text-green-500" />
                  {formatTimeAgo(selectedTicket.createdAt)}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full body-xs  font-semibold shadow-sm ${getPriorityColor(
                  selectedTicket.priority
                )}`}
              >
                {selectedTicket.priority}
              </span>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full body-xs  font-semibold shadow-sm ${getStatusColor(
                  selectedTicket.status
                )}`}
              >
                {selectedTicket.status}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
            {/* Customer Information */}
            <div className="bg-gray-50 rounded-md p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center body-xs   ">
                <User className="h-4 w-4 mr-2 text-blue-500" />
                Customer Information
              </h3>
              <div className="space-y-2">
                <div className="flex items-center bg-white p-2 rounded-md shadow-sm">
                  <div className="bg-blue-100 rounded-full p-1 mr-2">
                    <User className="h-3 w-3 text-blue-600" />
                  </div>
                  <div>
                    <p className="body-xs  text-gray-600">Customer ID</p>
                    <p className="font-medium text-gray-900 text-xs">{selectedTicket?.createdBy?._id || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center bg-white p-2 rounded-md shadow-sm">
                  <div className="bg-green-100 rounded-full p-1 mr-2">
                    <User className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <p className="body-xs  text-gray-600">Name</p>
                    <p className="font-medium text-gray-900 text-xs">
                      {selectedTicket?.createdBy?.name?.toUpperCase() || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Information */}
            <div className="bg-gray-50 rounded-md p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center body-xs   ">
                <Tag className="h-4 w-4 mr-2 text-purple-500" />
                Ticket Information
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-1 border-b border-gray-200">
                  <span className="body-xs  text-gray-600 font-medium">Assigned To:</span>
                  <span className="body-xs  font-semibold text-gray-900">
                    {selectedTicket?.assignedTo?.name?.toUpperCase() || "Unassigned"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-200">
                  <span className="body-xs  text-gray-600 font-medium">Role:</span>
                  <span className="body-xs  font-semibold text-gray-900">
                    {selectedTicket?.assignedTo?.role?.toUpperCase() || "No Role"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="body-xs  text-gray-600 font-medium">Last Updated:</span>
                  <span className="body-xs  font-semibold text-gray-900">
                    {formatTimeAgo(selectedTicket?.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-5">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center body-xs   ">
              <FileText className="h-4 w-4 mr-2 text-orange-500" />
              Description
            </h3>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-md border border-gray-200">
              <p className="text-gray-700 body-xs    leading-relaxed">{selectedTicket?.description || "No description provided"}</p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mb-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center body-xs   ">
              <MessageSquare className="h-4 w-4 mr-2 text-indigo-500" />
              Comments ({selectedTicket?.comments?.length || 0})
            </h3>
            <div className="border border-gray-200 rounded-md bg-gray-50">
              <div className="max-h-64 overflow-y-auto p-3">
                {selectedTicket?.comments?.length > 0 ? (
                  <div className="space-y-3">
                    {selectedTicket?.comments?.map((comment, index) => (
                      <div key={index} className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-1 md:gap-0">
                          <div className="flex items-center gap-2">
                            <div className="bg-blue-100 rounded-full p-1">
                              <User className="h-3 w-3 text-blue-600" />
                            </div>
                            <span className="font-semibold text-gray-900 text-xs">
                              {comment?.user?.name || "Anonymous"}
                            </span>
                            <span className="body-xs  text-gray-500 bg-gray-100 px-1 py-0.5 rounded hidden md:inline">
                              {comment?.user?._id || "N/A"}
                            </span>
                          </div>
                          <span className="body-xs  text-gray-500 bg-gray-100 px-2 py-0.5 rounded self-start md:self-auto">
                            {formatTimeAgo(comment?.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-700 body-xs  leading-relaxed">{comment?.message || "No message"}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <MessageSquare className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 body-xs   ">No comments yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Add Comment */}
          {selectedTicket?.status !== 'RESOLVED' && (
            <div className="mb-5">
              <h3 className="font-semibold text-gray-900 mb-2 body-xs   ">Add Comment</h3>
              <div className="space-y-2">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Type your comment here..."
                  rows={2}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none body-xs  transition-all duration-200"
                />
                <button
                  onClick={addComment}
                  disabled={!newComment.trim()}
                  className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md text-xs"
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Add Comment
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedTicket?.status !== 'CLOSED' && (
                <button
                  className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md text-xs"
                  onClick={(e) => handleCloseClick(e)}
                  type="button"
                >
                  <X className="h-3 w-3 mr-1" />
                  Close Ticket
                </button>
              )}

              {(selectedTicket?.status === 'RESOLVED' || selectedTicket?.status === 'CLOSED') && (
                <button
                  className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md text-xs"
                  onClick={(e) => handleReOpenClick(e)}
                  type="button"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reopen Ticket
                </button>
              )}
            </div>
          }
          {/* Action Templates */}
          {isAdmin && <div>
            <h3 className="font-semibold text-gray-900 mb-2 body-xs   ">Available Actions</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(actionTemplates).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => {
                    setActionType(key);
                    setFormData({});
                  }}
                  className="px-3 py-1 body-xs  font-medium border border-gray-300 text-gray-700 rounded-md hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>}
        </div>
      </div>

      {/* Action Form */}
      {actionType && (
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 border-b border-gray-200">
            <h3 className="font-bold text-gray-900 body-xs   ">{actionTemplates[actionType].name}</h3>
            <p className="text-gray-600 mt-1 text-xs">{actionTemplates[actionType].description}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-4">
            <div className="space-y-4">
              {actionTemplates[actionType].fields.map((field, idx) => (
                <div key={idx} className="space-y-1">
                  <label className="block body-xs  font-medium text-gray-700  mb-1">
                    {field.label}
                  </label>
                  {console.log(field.name, formData[field.name])}
                  {field.type === "select" ? (

                    <select
                      value={formData[field.name] || ""}
                      onChange={(e) => handleFormChange(field.name, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-xs  transition-all duration-200"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      value={formData[field.name] || ""}
                      onChange={(e) => handleFormChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-xs  resize-none transition-all duration-200"
                    />
                  ) : (
                    <input
                      type="text"
                      value={formData[field.name] || ""}
                      onChange={(e) => handleFormChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-xs  transition-all duration-200"
                    />
                  )}
                </div>

              ))}
            </div>

            <div className="flex justify-end pt-4 mt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActionType(null)}
                  className="px-3 py-1.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-all duration-200 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md text-xs"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      Submit Action
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const DeleteConfirmation = ({ ticket, setShowDeleteConfirm, confirmDelete, isDeleting }) => {
  if (!ticket) return null;

  const deleteData = "Delete Ticket";

  return (
    <Modal isOpen={true} heading={deleteData} onClose={() => setShowCreateForm(false)}>
      <div className="sm:max-w-md">
        <div>
          <div className="flex items-center gap-2 text-red-600">
            <Trash2 className="w-5 h-5" /> Confirm Delete
          </div>
        </div>

        <div className="body-xs    text-gray-700 mb-4">
          Are you sure you want to delete the ticket titled:
          <span className="font-semibold"> "{ticket.title}"</span>?
          <p className="body-xs  text-gray-500 mt-2">This action cannot be undone.</p>
        </div>

        <div>
          <button
            className="px-4 py-2 body-xs    border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => setShowDeleteConfirm(false)}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 body-xs    bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            onClick={() => confirmDelete(ticket.id)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

const CreateTicketModal = ({
  createTicketData,
  createTicketErrors,
  setShowCreateForm,
  handleCreateTicketChange,
  handleCreateTicketSubmit,
  isCreatingTicket,
  categories,
  priorities,

}) => {
  const heading = "Create New Ticket";
  return (
    <Modal isOpen={true} heading={heading} onClose={() => setShowCreateForm(false)}>
      <div className="max-w-2xl">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block body-xs  font-medium mb-1">Title</label>
            <input
              type="text"
              className={`w-full border border-gray-300 rounded-md px-3 py-2 ${createTicketErrors.title ? 'border-red-600' : ''}`}
              value={createTicketData.title}
              onChange={(e) => handleCreateTicketChange("title", e.target.value)}
              placeholder="Enter ticket title"
            />
            {createTicketErrors.title && <p className="text-red-600 body-xs  mt-1">{createTicketErrors.title}</p>}
          </div>

          <div>
            <label className="block body-xs  font-medium mb-1">Priority</label>
            <select
              value={createTicketData.priority}
              onChange={(e) => handleCreateTicketChange("priority", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              {priorities.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>



          <div>
            <label className="block body-xs  font-medium mb-1">Category</label>
            <select
              value={createTicketData.category}
              onChange={(e) => handleCreateTicketChange("category", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>


        </div>

        <div className="mt-4 w-full">
          <label className="block body-xs  font-medium mb-1">Description</label>
          <textarea
            value={createTicketData.description}
            onChange={(e) => handleCreateTicketChange("description", e.target.value)}
            placeholder="Describe the issue in detail"
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          {createTicketErrors.description && <p className="text-red-600 body-xs  mt-1">{createTicketErrors.description}</p>}
        </div>

        {/* <div className="mt-4">
          <button variant="ghost" onClick={() => setShowCreateForm(false)}>
            Cancel
          </button>
          <button onClick={handleCreateTicketSubmit} disabled={isCreatingTicket}>
            {isCreatingTicket ? "Creating..." : "Create Ticket"}
          </button>
        </div> */}
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => setShowCreateForm(false)}
            className="px-4 py-2 body-xs    font-medium text-gray-600 bg-transparent 
               border border-gray-300 rounded-lg hover:bg-gray-100 
               focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleCreateTicketSubmit}
            disabled={isCreatingTicket}
            className={`px-4 py-2 body-xs    font-medium text-white rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500
               ${isCreatingTicket
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isCreatingTicket ? "Creating..." : "Create Ticket"}
          </button>
        </div>
      </div>
    </Modal>
  );
};