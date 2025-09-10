import { createAsyncThunk } from "@reduxjs/toolkit";
import { ticketApi } from "..//../api/apiService"

// Create ticket
export const createTicket = createAsyncThunk(
    "tickets/createTicket",
    async (ticketData, { rejectWithValue }) => {
        try {
            const res = await ticketApi.create(ticketData);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch all tickets
export const fetchTickets = createAsyncThunk(
    "tickets/fetchTickets",
    async (_, { rejectWithValue }) => {
        try {
            const res = await ticketApi.getAll();
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch ticket by ID
export const fetchTicketById = createAsyncThunk(
    "tickets/fetchTicketById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await ticketApi.getById(id);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Add comment
export const addComments = createAsyncThunk(
    "tickets/addComment",
    async ({ticketId , data }, { rejectWithValue }) => {
        try {
            console.log("Adding comment and inside the thunk-------------:", ticketId, data);
            const res = await ticketApi.addComment(ticketId, data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Change status
export const changeStatus = createAsyncThunk(
    "tickets/changeStatus",
    async ({ id, status,notes }, { rejectWithValue }) => {
        try {
            const res = await ticketApi.changeStatus(id, status,notes);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

//change priority
export const changePriority = createAsyncThunk(
    "tickets/changePriority",
    async ({id,priority,notes},{rejectWithValue})=>{
        try{
            console.log('inside the thunk of change priority');
            const res = await ticketApi.changePriority(id,notes,priority);
            console.log('->res',res.data.ticket);
            return res.data.ticket;
        }catch(error){
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// Escalate ticket
export const escalateTicket = createAsyncThunk(
    "tickets/escalateTicket",
    async (id, { rejectWithValue }) => {
        try {
            const res = await ticketApi.escalate(id);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Clear escalation
export const clearEscalation = createAsyncThunk(
    "tickets/clearEscalation",
    async (id, { rejectWithValue }) => {
        try {
            const res = await ticketApi.clearEscalation(id);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Reopen ticket
export const reopenTicket = createAsyncThunk(
    "tickets/reopenTicket",
    async (id, { rejectWithValue }) => {
        try {
            console.log('inside the thunk and Reopening ticket with ID:', id);
            const res = await ticketApi.reopen(id);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Close ticket
export const closeTicket = createAsyncThunk(
    "tickets/closeTicket",
    async (id, { rejectWithValue }) => {    
        try {
            const res = await ticketApi.closeTicket(id);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }   
    }
);

// Fetch by Admin
export const fetchTicketsByAdmin = createAsyncThunk(
    "tickets/fetchTicketsByAdmin",
    async (adminId, { rejectWithValue }) => {
        try {
            const res = await ticketApi.getByAdminId(adminId);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch by User
export const fetchTicketsByUserId = createAsyncThunk(
    "tickets/fetchTicketsByUserId",
    async (userId, { rejectWithValue }) => {
        try {
            console.log('inside fetchTicketsByUserId thunk', userId);
            const res = await ticketApi.getByUserId(userId);
            console.log(
                'Response from fetchTicketsByUserId thunk---------:',
                res.data
            )
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch by Meter
export const fetchTicketsByMeter = createAsyncThunk(
    "tickets/fetchTicketsByMeter",
    async (meterId, { rejectWithValue }) => {
        try {
            const res = await ticketApi.getByMeterId(meterId);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


