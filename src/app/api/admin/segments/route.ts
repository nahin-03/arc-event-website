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
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin-verification";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isAdminEmail(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "name";
    const sortOrder = (searchParams.get("sortOrder") || "asc") as "asc" | "desc";

    // Filter segments based on search
    let filtered = await prisma.segment.findMany();
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (segment) =>
          segment.name.toLowerCase().includes(searchLower) ||
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

    return NextResponse.json({
      success: true,
      data: {
        items,
        total,
        page,
        limit,
        totalPages,
      },
      message: "Segments fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching segments:", error);
    return NextResponse.json(
<<<<<<< HEAD
      {
        success: false,
        error: "SERVER_ERROR",
        message: "Failed to fetch segments",
      },
>>>>>>> main
=======
      { error: "Failed to fetch segments" },
>>>>>>> feature/new-work
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
    if (!session?.user?.email || !isAdminEmail(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, rules, prizePool, status, imageUrl } = body;

    if (!name || !description) {
      return NextResponse.json(
<<<<<<< HEAD
        {
          success: false,
          error: "VALIDATION_ERROR",
          message: "Missing required fields: title, status",
        },
>>>>>>> main
=======
        { error: "Name and description are required" },
>>>>>>> feature/new-work
        { status: 400 }
      );
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> feature/new-work
    const segment = await prisma.segment.create({
      data: {
        name,
        description,
<<<<<<< HEAD
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
=======
        rules,
        prizePool,
        status,
        imageUrl,
        displayOrder: (await prisma.segment.count()) + 1,
>>>>>>> feature/new-work
      },
    });

    return NextResponse.json({ success: true, data: segment });
  } catch (error) {
    console.error("Error creating segment:", error);
    return NextResponse.json(
<<<<<<< HEAD
      {
        success: false,
        error: "SERVER_ERROR",
        message: "Failed to create segment",
      },
>>>>>>> main
=======
      { error: "Failed to create segment" },
>>>>>>> feature/new-work
      { status: 500 }
    );
  }
}
