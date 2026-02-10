import mongoose from "mongoose";

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },

    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },

    description: {
      type: String,
      required: true,
    },

    attachment: {
      type: String,
      default: null,
    },

    status: {
  type: String,
  enum: ["Open", "In Progress", "Waiting for User", "Closed"],
  default: "Open",
    },

   workLog: {
  type: [
    {
      message: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
      by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  default: [], 
},


resolution: {
  summary: String,
  rootCause: String,
  fixedAt: Date,
},

startedAt: Date,
closedAt: Date,




    // ✅ FEEDBACK (BUSINESS LOGIC)
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
      },
      submittedAt: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
