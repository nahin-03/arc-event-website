<<<<<<< HEAD
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// UPDATE a segment
=======
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

// Mock database
const segments: Record<
  number,
  {
    id: number;
    title: string;
    participants: number;
    prize: string;
    status: string;
    duration: string;
    color: string;
  }
> = {
  1: { id: 1, title: 'Robo Wars', participants: 48, prize: '$5,000', status: 'Active', duration: '3 Hours', color: 'from-orange-500/20 to-red-500/20' },
  2: { id: 2, title: 'Line Follower', participants: 32, prize: '$2,000', status: 'Active', duration: '2 Hours', color: 'from-blue-500/20 to-cyan-500/20' },
  3: { id: 3, title: 'Drone Racing', participants: 24, prize: '$3,500', status: 'Upcoming', duration: '4 Hours', color: 'from-purple-500/20 to-pink-500/20' },
  4: { id: 4, title: 'AI Hackathon', participants: 150, prize: '$10,000', status: 'Registration Open', duration: '24 Hours', color: 'from-[#588157]/20 to-[#a3b18a]/20' },
  5: { id: 5, title: 'Maze Solver', participants: 20, prize: '$1,500', status: 'Active', duration: '1.5 Hours', color: 'from-amber-500/20 to-yellow-500/20' },
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "UNAUTHORIZED", message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const segmentId = parseInt(id);
    const segment = segments[segmentId];

    if (!segment) {
      return NextResponse.json(
        { success: false, error: "NOT_FOUND", message: "Segment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: segment,
        message: "Segment fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching segment:", error);
    return NextResponse.json(
      {
        success: false,
        error: "SERVER_ERROR",
        message: "Failed to fetch segment",
      },
      { status: 500 }
    );
  }
}

>>>>>>> main
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
<<<<<<< HEAD
    const { id } = await params;
    const segmentId = parseInt(id);
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
        { status: 400 }
      );
    }

    const segment = await prisma.segment.update({
      where: { id: segmentId },
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

    return NextResponse.json(segment);
  } catch (error) {
    console.error("Failed to update segment:", error);
    return NextResponse.json(
      { message: "Failed to update segment" },
=======
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "UNAUTHORIZED", message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const segmentId = parseInt(id);
    const segment = segments[segmentId];

    if (!segment) {
      return NextResponse.json(
        { success: false, error: "NOT_FOUND", message: "Segment not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const updatedSegment = { ...segment, ...body, id: segmentId };
    segments[segmentId] = updatedSegment;

    return NextResponse.json(
      {
        success: true,
        data: updatedSegment,
        message: "Segment updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating segment:", error);
    return NextResponse.json(
      {
        success: false,
        error: "SERVER_ERROR",
        message: "Failed to update segment",
      },
>>>>>>> main
      { status: 500 }
    );
  }
}

<<<<<<< HEAD
// DELETE a segment
=======
>>>>>>> main
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
<<<<<<< HEAD
    const { id } = await params;
    const segmentId = parseInt(id);

    // Check if segment has any registrations
    const registrationCount = await prisma.registration.count({
      where: { segmentId },
    });

    if (registrationCount > 0) {
      return NextResponse.json(
        { message: "Cannot delete segment with existing registrations" },
        { status: 400 }
      );
    }

    await prisma.segment.delete({
      where: { id: segmentId },
    });

    return NextResponse.json({ message: "Segment deleted successfully" });
  } catch (error) {
    console.error("Failed to delete segment:", error);
    return NextResponse.json(
      { message: "Failed to delete segment" },
=======
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "UNAUTHORIZED", message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const segmentId = parseInt(id);
    if (!segments[segmentId]) {
      return NextResponse.json(
        { success: false, error: "NOT_FOUND", message: "Segment not found" },
        { status: 404 }
      );
    }

    delete segments[segmentId];

    return NextResponse.json(
      {
        success: true,
        data: null,
        message: "Segment deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting segment:", error);
    return NextResponse.json(
      {
        success: false,
        error: "SERVER_ERROR",
        message: "Failed to delete segment",
      },
>>>>>>> main
      { status: 500 }
    );
  }
}
