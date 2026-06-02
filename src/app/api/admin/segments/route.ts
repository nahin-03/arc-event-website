<<<<<<< HEAD
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all segments for admin
export async function GET() {
  try {
    const segments = await prisma.segment.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(segments);
  } catch (error) {
    console.error("Failed to fetch segments:", error);
    return NextResponse.json(
      { message: "Failed to fetch segments" },
=======
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

// Mock data - In production, this would come from database
const mockSegments = [
  { id: 1, title: 'Robo Wars', participants: 48, prize: '$5,000', status: 'Active', duration: '3 Hours', color: 'from-orange-500/20 to-red-500/20' },
  { id: 2, title: 'Line Follower', participants: 32, prize: '$2,000', status: 'Active', duration: '2 Hours', color: 'from-blue-500/20 to-cyan-500/20' },
  { id: 3, title: 'Drone Racing', participants: 24, prize: '$3,500', status: 'Upcoming', duration: '4 Hours', color: 'from-purple-500/20 to-pink-500/20' },
  { id: 4, title: 'AI Hackathon', participants: 150, prize: '$10,000', status: 'Registration Open', duration: '24 Hours', color: 'from-[#588157]/20 to-[#a3b18a]/20' },
  { id: 5, title: 'Maze Solver', participants: 20, prize: '$1,500', status: 'Active', duration: '1.5 Hours', color: 'from-amber-500/20 to-yellow-500/20' },
];

export async function GET(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "UNAUTHORIZED", message: "Unauthorized access" },
        { status: 401 }
      );
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "title";
    const sortOrder = (searchParams.get("sortOrder") || "asc") as "asc" | "desc";

    // Filter segments based on search
    let filtered = mockSegments;
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = mockSegments.filter(
        (segment) =>
          segment.title.toLowerCase().includes(searchLower) ||
          segment.status.toLowerCase().includes(searchLower)
      );
    }

    // Sort segments
    const sorted = filtered.sort((a, b) => {
      let aVal = a[sortBy as keyof typeof a];
      let bVal = b[sortBy as keyof typeof b];

      // Handle numeric sorting
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      // Handle string sorting
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    // Paginate
    const total = sorted.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const items = sorted.slice(start, start + limit);

    return NextResponse.json(
      {
        success: true,
        data: {
          items,
          total,
          page,
          limit,
          totalPages,
        },
        message: "Segments fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching segments:", error);
    return NextResponse.json(
      {
        success: false,
        error: "SERVER_ERROR",
        message: "Failed to fetch segments",
      },
>>>>>>> main
      { status: 500 }
    );
  }
}

<<<<<<< HEAD
// CREATE a new segment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      rules,
      prizePool,
      category,
      type,
      difficulty,
      teamSize,
      fee,
      deadline,
      location,
      scheduleText,
      ruleBookUrl,
      highlights,
      status,
      imageUrl,
    } = body;

    if (!name || !description) {
      return NextResponse.json(
        { message: "Name and description are required" },
=======
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "UNAUTHORIZED", message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, participants, prize, status, duration, color } = body;

    if (!title || !status) {
      return NextResponse.json(
        {
          success: false,
          error: "VALIDATION_ERROR",
          message: "Missing required fields: title, status",
        },
>>>>>>> main
        { status: 400 }
      );
    }

<<<<<<< HEAD
    const segment = await prisma.segment.create({
      data: {
        name,
        description,
        rules: rules || "",
        prizePool: prizePool || "Not Specified",
        category: category || "General",
        type: type || "Team",
        difficulty: difficulty || "Medium",
        teamSize: teamSize || "TBA",
        fee: fee || "TBA",
        deadline: deadline || "TBA",
        location: location || "TBA",
        scheduleText: scheduleText || "TBA",
        ruleBookUrl: ruleBookUrl || null,
        highlights: Array.isArray(highlights)
          ? highlights
          : String(highlights || "")
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean),
        status: status || "active",
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json(segment, { status: 201 });
  } catch (error) {
    console.error("Failed to create segment:", error);
    return NextResponse.json(
      { message: "Failed to create segment" },
=======
    // Create new segment (in production, save to database)
    const newSegment = {
      id: Math.max(...mockSegments.map((s) => s.id)) + 1,
      title,
      participants: participants || 0,
      prize: prize || "$0",
      status,
      duration: duration || "0 Hours",
      color: color || "from-gray-500/20 to-gray-500/20",
    };

    return NextResponse.json(
      {
        success: true,
        data: newSegment,
        message: "Segment created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating segment:", error);
    return NextResponse.json(
      {
        success: false,
        error: "SERVER_ERROR",
        message: "Failed to create segment",
      },
>>>>>>> main
      { status: 500 }
    );
  }
}
