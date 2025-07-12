import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Box,
  Switch, // Keep if still used elsewhere, though not in this snippet
  TextField, // Keep if still used elsewhere
  Button,
  Avatar, // Keep if still used elsewhere
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";

import {
  Send as SendIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  Home as HomeIcon, // New: Home icon
  Search as SearchIcon, // New: Search icon
  AddBoxOutlined as AddBoxOutlinedIcon, // New: Create/Add icon
  Movie as MovieIcon, // New: Reels icon
  AccountCircle as AccountCircleIcon, // New: Profile icon
  FavoriteBorder as FavoriteBorderIcon, // Keep if still used elsewhere
  ChatBubbleOutline as ChatBubbleOutlineIcon, // Keep if still used elsewhere
  Share as ShareIcon, // Keep if still used elsewhere
  BookmarkBorder as BookmarkBorderIcon, // Keep if still used elsewhere
} from "@mui/icons-material";
import BuilderControls from "./components/Builder/BuildersContorls";
import {
  StyledPhoneFooter,
  StyledPhoneFrame,
  StyledPhoneScreen,
} from "./components/Style/Styled";
import PhoneHeader from "./components/Builder/PhoneHeader";
import StoryCard from "./components/Builder/StoryCard";
import MessageBubble from "./components/Builder/MessageBubble";
import { SidebarContent } from "./components/Builder/drawerList";
import PostCard from "./components/Builder/PostCard";
import CommentsView from "./components/Builder/CommentsView";
import DirectMessagesView from "./components/Builder/DirectMessagesView";

// --- Components (Assuming these are defined as provided previously) ---

function PhoneFrame({ children }) {
  return <StyledPhoneFrame>{children}</StyledPhoneFrame>;
}

function PhoneScreen({ children }) {
  return <StyledPhoneScreen>{children}</StyledPhoneScreen>;
}

function PhoneFooter({ children }) {
  return <StyledPhoneFooter>{children}</StyledPhoneFooter>;
}

function App() {
  const defaultPost = {
    id: "s1",
    user: "Zack",
    avatar: "https://via.placeholder.com/60/FF5733/FFFFFF?text=YOU",
    content: "Just posted about my new project! Check it out!",
    image: "https://picsum.photos/id/237/800/600",
  };

  // State for managing active section in phone preview
  const [activeSection, setActiveSection] = useState("posts");

  // State for creating new posts
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([defaultPost]); // Array to hold all created posts

  // State for comments (used in comments section and potentially on posts)
  const [commentText, setCommentText] = useState("");

  // State for Direct Messages
  const [dmMessage, setDmMessage] = useState("");
  const [dmHistory, setDmHistory] = useState([]);

  // State for creating new stories (distinct from hardcoded samples in BuilderControls)
  const [storyContent, setStoryContent] = useState("");
  const [stories, setStories] = useState([]); // Array to hold dynamically created stories

  const [activeStoryId, setActiveStoryId] = useState(null);

  // State for controlling the visibility of sections in BuilderControls
  const [currentStep, setCurrentStep] = useState(0); // 0: initial, 1: comment, 2: DM, 3: other automations

  // Handler for creating a new post from BuilderControls
  const handleCreatePost = () => {
    if (postContent.trim()) {
      const newPost = {
        id: Date.now(),
        user: "botspacehq", // Default user for created posts
        caption: postContent,
        image: "https://placehold.co/280x200/25D366/ffffff?text=WhatsApp+Post", // Default image
        likes: 0,
        comments: 0,
        time: "Just now",
      };
      setPosts([newPost, ...posts]); // Add new post to the top
      setPostContent(""); // Clear input field
    }
  };

  // Handler for adding a comment (e.g., from phone preview's comment input)
  const handleAddComment = (postId) => {
    if (commentText.trim()) {
      console.log(
        `Comment "${commentText}" added to post ${postId || "a post"}`
      );
      setCommentText(""); // Clear comment input
    }
  };

  // Handler for sending a DM
  const handleSendDm = () => {
    if (dmMessage.trim()) {
      setDmHistory([...dmHistory, { text: dmMessage, type: "sent" }]); // Add sent message
      setTimeout(() => {
        setDmHistory((prev) => [
          ...prev,
          { text: "Thanks for your message!", type: "received" }, // Simulate a reply
        ]);
      }, 1000);
      setDmMessage(""); // Clear DM input
    }
  };

  /**
   * NEW: Handler for clicking on a hardcoded story preview in BuilderControls.
   * This converts the story's content into a new post and displays it.
   */
  const handleStoryPreviewClick = (story) => {
    setActiveStoryId(story.id);
    const newPostFromStory = {
      id: Date.now(),
      user: story.user, // Use the story's user as the post user
      caption: `From ${story.user}'s Story: "${story.content}"`, // Include story content in post caption
      // Attempt to get a larger, similar image or fallback
      // image: story.avatar.replace('60', '280').replace('60', '200') || "https://placehold.co/280x200/cccccc/000000?text=Story+as+Post",
      image:
        story.image ||
        "https://placehold.co/280x200/cccccc/000000?text=Story+as+Post",
      likes: Math.floor(Math.random() * 100) + 5, // Random likes for a 'new' post
      comments: Math.floor(Math.random() * 20) + 1, // Random comments
      time: "Just now (from story)",
    };
    setPosts([newPostFromStory]);
    // setPosts([newPostFromStory, ...posts]); // Add the new post to the beginning of the posts list
    setActiveSection("posts"); // Switch the phone preview to the posts section
    console.log(
      `Story "${story.content}" from BuilderControls preview converted to post.`
    );
  };

  // Handler for clicking on a dynamically created story in the *phone preview's story carousel*.
  // This currently switches to the posts view, but could be extended to show the actual story content.
  const handleStoryClick = (storyId) => {
    setActiveSection("posts"); // Currently, clicking a story in phone preview leads to posts
    console.log(
      `Story ${storyId} clicked in phone preview. Switching to posts view.`
    );
  };

  // Handler for clicking the "Next" button in BuilderControls
  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // *** NEW: useEffect to synchronize phone preview with builder steps ***
  useEffect(() => {
    switch (currentStep) {
      case 0:
        setActiveSection("posts"); // Default to posts when at step 0
        break;
      case 1:
        setActiveSection("comments"); // Move to comments when builder is on step 1
        break;
      case 2:
        setActiveSection("dm"); // Move to DM when builder is on step 2
        break;
      default:
        break;
    }
  }, [currentStep]);

  // Renders the content displayed inside the phone frame based on activeSection state
  const renderPhoneContent = () => {
    switch (activeSection) {
      case "posts":
        return (
          <>
            <PhoneHeader title="Posts" onBack={() => {}} onMore={() => {}} />
            <PhoneScreen>
              {posts.length === 0 ? (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                  sx={{ mt: 2 }}
                >
                  No posts yet. Create one or click a sample story!
                </Typography>
              ) : (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    commentText={commentText}
                    onCommentTextChange={(e) => setCommentText(e.target.value)}
                    onAddComment={handleAddComment}
                  />
                ))
              )}
            </PhoneScreen>
          </>
        );
      case "comments": // The comments view (currently with hardcoded example comments)
        return (
          <>
            <CommentsView
              setActiveSection={setActiveSection}
              setCommentText={setCommentText}
              commentText={commentText}
            />
          </>
        );
      case "dm": // The Direct Messages view
        return (
          <>
            <DirectMessagesView
              setActiveSection={setActiveSection}
              dmMessage={dmMessage}
              setDmMessage={setDmMessage}
              dmHistory={dmHistory}
              handleSendDm={handleSendDm}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <CssBaseline />

      {/* The persistent sidebar (left navigation) */}
      <SidebarContent setActiveSection={setActiveSection} />

      {/* Main content area, containing BuilderControls and Phone Preview */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 0,
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stacks vertically on small screens, horizontally on medium+
          gap: 3, // Spacing between BuilderControls and Phone Preview
          overflow: "hidden", // Prevents overflow of content within this box
        }}
      >
        {/* ======>   Builder Controls Component  <========= */}

        <BuilderControls
          postContent={postContent}
          onPostContentChange={(e) => setPostContent(e.target.value)}
          onCreatePost={handleCreatePost}
          storyContent={storyContent}
          onStoryContentChange={(e) => setStoryContent(e.target.value)}
          onStoryPreviewClick={handleStoryPreviewClick} // Pass the handler for hardcoded story clicks
          commentText={commentText}
          onCommentTextChange={(e) => setCommentText(e.target.value)}
          onAddComment={handleAddComment}
          currentStep={currentStep} // Pass current step
          onNextStep={handleNextStep}
          activeStoryId={activeStoryId}
        />

        {/* Phone Preview Area */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 1,
            maxHeight: { xs: "50vh", md: "calc(100vh - 100px)" }, // Constrain height on smaller screens
          }}
        >
          <PhoneFrame>
            {/* {renderPhoneContent()} */}
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              {renderPhoneContent()}
            </Box>
            {activeSection !== "dm" && activeSection !== "comments" && (
              <StyledPhoneFooter paddingTop={20}>
                <IconButton
                  onClick={() => setActiveSection("posts")}
                  sx={{
                    color: activeSection === "posts" ? "#25D366" : "#b0b0b0",
                  }}
                >
                  <HomeIcon />
                </IconButton>
                <IconButton
                  onClick={() => setActiveSection("posts")}
                  sx={{ color: "#b0b0b0" }}
                >
                  <SearchIcon />
                </IconButton>
                <IconButton
                  onClick={() => setActiveSection("posts")}
                  sx={{ color: "#b0b0b0" }}
                >
                  <AddBoxOutlinedIcon />
                </IconButton>
                <IconButton
                  onClick={() => setActiveSection("posts")}
                  sx={{ color: "#b0b0b0" }}
                >
                  <MovieIcon />
                </IconButton>
                <IconButton
                  onClick={() => setActiveSection("posts")}
                  sx={{ color: "#b0b0b0" }}
                >
                  <AccountCircleIcon />
                </IconButton>
              </StyledPhoneFooter>
            )}
          </PhoneFrame>

          {/* ==========> Phone Bottom Navigation (Post, Comments, DM buttons) <============ */}

          <Paper
            elevation={3}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "300px", // Fixed width for phone bottom nav
              borderRadius: "12px",
              mt: 2, // Margin top
              p: 1,
              backgroundColor: "#f0f0f0",
            }}
          >
            <Button
              onClick={() => setActiveSection("posts")}
              sx={{
                textTransform: "none",
                flexGrow: 1,
                borderRadius: "8px",
                backgroundColor:
                  activeSection === "posts" ? "#25D366" : "transparent",
                color: activeSection === "posts" ? "#fff" : "#000",
                "&:hover": {
                  backgroundColor:
                    activeSection === "posts" ? "#1DA851" : "#e0e0e0",
                },
              }}
            >
              Post
            </Button>
            <Button
              onClick={() => setActiveSection("comments")}
              sx={{
                textTransform: "none",
                flexGrow: 1,
                borderRadius: "8px",
                backgroundColor:
                  activeSection === "comments" ? "#25D366" : "transparent",
                color: activeSection === "comments" ? "#fff" : "#000",
                "&:hover": {
                  backgroundColor:
                    activeSection === "comments" ? "#1DA851" : "#e0e0e0",
                },
              }}
            >
              Comments
            </Button>
            <Button
              onClick={() => setActiveSection("dm")}
              sx={{
                textTransform: "none",
                flexGrow: 1,
                borderRadius: "8px",
                backgroundColor:
                  activeSection === "dm" ? "#25D366" : "transparent",
                color: activeSection === "dm" ? "#fff" : "#000",
                "&:hover": {
                  backgroundColor:
                    activeSection === "dm" ? "#1DA851" : "#e0e0e0",
                },
              }}
            >
              DM
            </Button>
          </Paper>

          {/* ==========> Phone Bottom Navigation (Post, Comments, DM buttons) <============ */}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
