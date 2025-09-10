// import { createSlice } from "@reduxjs/toolkit";
// import {
//   createTicket,
//   fetchTickets,
//   fetchTicketById,
//   fetchTicketsByAdmin,
//   fetchTicketsByUserId,
//   fetchTicketsByMeter,
//   addComments,
//   changeStatus,
//   escalateTicket,
//   clearEscalation,
//   reopenTicket,
// } from "../thunks/ticketThunks";

// const initialState = {
//   ticketData: [],
//   selectedTicket: null,
//   loading: false,
//   error: null,
// };

// const ticketSlice = createSlice({
//   name: "tickets",
//   initialState,
//   reducers: {
//     clearSelectedTicket: (state) => {
//       state.selectedTicket = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create
//       .addCase(createTicket.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createTicket.fulfilled, (state, action) => {
//         state.loading = false;
//         state.ticketData.push(action.payload);
//       })
//       .addCase(createTicket.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Get all
//       .addCase(fetchTicketsByUserId.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchTicketsByUserId.fulfilled, (state, action) => {

//         console.log("data:", action.payload);
//         state.loading = false;
//         state.ticketData = action.payload;
//       })
//       .addCase(fetchTicketsByUserId.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Get by ID
//       .addCase(fetchTicketById.fulfilled, (state, action) => {
//         state.selectedTicket = action.payload;
//       })

//       // Get by AdminId / UserId / MeterId
//       .addCase(fetchTicketsByAdmin.fulfilled, (state, action) => {
//         state.ticketData = action.payload;
//       })
//       .addCase(fetchTicketsByMeter.fulfilled, (state, action) => {
//         state.ticketData = action.payload;
//       })

//       // Add comment
//       .addCase(addComments.fulfilled, (state, action) => {
//         state.selectedTicket = action.payload;
//       })

//       // Change status
//       .addCase(changeStatus.fulfilled, (state, action) => {
//         state.selectedTicket = action.payload;
//       })

//       // Escalate
//       .addCase(escalateTicket.fulfilled, (state, action) => {
//         state.selectedTicket = action.payload;
//       })

//       // Clear escalation
//       .addCase(clearEscalation.fulfilled, (state, action) => {
//         state.selectedTicket = action.payload;
//       })

//       // Reopen
//       .addCase(reopenTicket.fulfilled, (state, action) => {
//         state.selectedTicket = action.payload;
//       });
//   },
// });

// // Selectors
// export const selectTickets = (state) => state.tickets.ticketData;
// export const selectSelectedTicket = (state) => state.tickets?.selectedTicket;
// export const selectTicketsLoading = (state) => state.tickets?.loading;
// export const selectTicketsError = (state) => state.tickets?.error;

// export const { clearSelectedTicket } = ticketSlice.actions;
// export default ticketSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";
import {
  createTicket,
  fetchTickets,
  fetchTicketById,
  fetchTicketsByAdmin,
  fetchTicketsByUserId,
  fetchTicketsByMeter,
  addComments,
  changeStatus,
  escalateTicket,
  clearEscalation,
  changePriority,
  reopenTicket,
  closeTicket,
} from "../thunks/ticketThunks";

const initialState = {
  ticketData: [],
  selectedTicket: null,
  loading: false,
  error: null,
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    clearSelectedTicket: (state) => {
      state.selectedTicket = null;
    },
    selectIndividualTicket: (state, action) => {
      state.selectedTicket = action.payload;
    },
    
    addCommentSelectedTicket: (state, action) => {
      if (state.selectedTicket) {
        state.selectedTicket.comments = [
          ...(state.selectedTicket.comments || []),
          action.payload,
        ];

        //Also update in ticketData
        const index = state.ticketData.findIndex(
          (t) => t._id === state.selectedTicket._id
        );
        if (index !== -1) {
          state.ticketData[index].comments = [
            ...(state.ticketData[index].comments || []),
            action.payload,
          ];
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Ticket
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.ticketData.push(action.payload);
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Tickets by User
      .addCase(fetchTicketsByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTicketsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.ticketData = action.payload;
      })
      .addCase(fetchTicketsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Ticket by ID
      .addCase(fetchTicketById.fulfilled, (state, action) => {
        state.selectedTicket = action.payload;
      })

      // Fetch Tickets by Admin / Meter
      .addCase(fetchTicketsByAdmin.fulfilled, (state, action) => {
        state.ticketData = action.payload;
      })
      .addCase(fetchTicketsByMeter.fulfilled, (state, action) => {
        state.ticketData = action.payload;
      })

      // Add Comment
      .addCase(addComments.fulfilled, (state, action) => {
        const updatedTicket = action.payload;

        // Update selectedTicket
        if (state.selectedTicket?._id === updatedTicket._id) {
          state.selectedTicket = updatedTicket;
        }

        // Update ticketData
        const index = state.ticketData.findIndex((t) => t._id === updatedTicket._id);
        if (index !== -1) {
          state.ticketData[index] = updatedTicket;
        }
      })

      // Change Status
      .addCase(changeStatus.fulfilled, (state, action) => {
        const updatedTicket = action.payload;

        if (state.selectedTicket?._id === updatedTicket._id) {
          state.selectedTicket = updatedTicket;
        }

        const index = state.ticketData.findIndex((t) => t._id === updatedTicket._id);
        if (index !== -1) {
          state.ticketData[index] = updatedTicket;
        }
      })

      .addCase(changePriority.fulfilled,(state,action)=>{
        const updatedTicket = action.payload;

        if (state.selectedTicket?._id === updatedTicket._id) {
          state.selectedTicket = updatedTicket;
        }

        const index = state.ticketData.findIndex((t) => t._id === updatedTicket._id);
        if (index !== -1) {
          state.ticketData[index] = updatedTicket;
        }
      })
      // Escalate
      .addCase(escalateTicket.fulfilled, (state, action) => {
        const updatedTicket = action.payload;

        if (state.selectedTicket?._id === updatedTicket._id) {
          state.selectedTicket = updatedTicket;
        }

        const index = state.ticketData.findIndex((t) => t._id === updatedTicket._id);
        if (index !== -1) {
          state.ticketData[index] = updatedTicket;
        }
      })

      // Clear Escalation
      .addCase(clearEscalation.fulfilled, (state, action) => {
        const updatedTicket = action.payload;

        if (state.selectedTicket?._id === updatedTicket._id) {
          state.selectedTicket = updatedTicket;
        }

        const index = state.ticketData.findIndex((t) => t._id === updatedTicket._id);
        if (index !== -1) {
          state.ticketData[index] = updatedTicket;
        }
      })

      // Reopen
      .addCase(reopenTicket.fulfilled, (state, action) => {
        const updatedTicket = action.payload;

        if (state.selectedTicket?._id === updatedTicket._id) {
          state.selectedTicket = updatedTicket;
        }

        const index = state.ticketData.findIndex((t) => t._id === updatedTicket._id);
        if (index !== -1) {
          state.ticketData[index] = updatedTicket;
        }
      })

      // Close Ticket
      .addCase(closeTicket.fulfilled, (state, action) => {
        const updatedTicket = action.payload;

        if (state.selectedTicket?._id === updatedTicket._id) {
          state.selectedTicket = updatedTicket;
        }

        const index = state.ticketData.findIndex((t) => t._id === updatedTicket._id);
        if (index !== -1) {
          state.ticketData[index] = updatedTicket;
        }
      });
  },
});

// Selectors
export const selectTickets = (state) => state.tickets.ticketData;
export const selectSelectedTicket = (state) => state.tickets.selectedTicket;
export const selectTicketsLoading = (state) => state.tickets.loading;
export const selectTicketsError = (state) => state.tickets.error;

// Reducer actions
export const {
  clearSelectedTicket,
  selectIndividualTicket,
  updateStatusSelectedTicket,
  addCommentSelectedTicket,
  updatePrioritySelectedTicket,
} = ticketSlice.actions;

export default ticketSlice.reducer;