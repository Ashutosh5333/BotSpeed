import React, { useState } from "react";
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
  // State for managing active section in phone preview
  const [activeSection, setActiveSection] = useState("posts");

  // State for creating new posts
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]); // Array to hold all created posts

  // State for comments (used in comments section and potentially on posts)
  const [commentText, setCommentText] = useState("");

  // State for Direct Messages
  const [dmMessage, setDmMessage] = useState("");
  const [dmHistory, setDmHistory] = useState([]);

  // State for creating new stories (distinct from hardcoded samples in BuilderControls)
  const [storyContent, setStoryContent] = useState("");
  const [stories, setStories] = useState([]); // Array to hold dynamically created stories

  const [activeStoryId, setActiveStoryId] = useState(null);

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

  // Handler for creating a new story from BuilderControls
  const handleCreateStory = () => {
    if (storyContent.trim()) {
      const newStory = {
        id: Date.now(),
        user: "You",
        content: storyContent,
        image: "https://placehold.co/80x80/075E54/ffffff?text=Story",
        avatar: "https://placehold.co/70x70/000/fff?text=You",
      };
      setStories([newStory, ...stories]); // Add new story to the top
      setStoryContent(""); // Clear input field
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
      case "stories": // This section shows dynamically created stories in the phone preview carousel
        return (
          <>
            <PhoneHeader title="Stories" onBack={() => {}} onMore={() => {}} />
            <PhoneScreen>
              <Box
                display="flex"
                overflow="auto"
                py={1}
                sx={{ "&::-webkit-scrollbar": { display: "none" } }}
              >
                {/* Your own story (fixed placeholder) */}
                <StoryCard
                  story={{
                    user: "You",
                    avatar: "https://placehold.co/70x70/000/fff?text=You",
                  }}
                  onClick={() => handleStoryClick("your-story")}
                />
                {/* Dynamically created stories */}
                {stories.length === 0 ? (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                    sx={{ mt: 2, ml: 2 }}
                  >
                    No stories yet. Create one!
                  </Typography>
                ) : (
                  stories.map((story) => (
                    <StoryCard
                      key={story.id}
                      story={story}
                      onClick={() => handleStoryClick(story.id)}
                    />
                  ))
                )}
              </Box>
            </PhoneScreen>
          </>
        );
      case "comments": // The comments view (currently with hardcoded example comments)
        return (
          <>
            <PhoneHeader
              title="Comments"
              onBack={() => setActiveSection("posts")} // Navigate back to posts
              onMore={() => {}}
            />
            <PhoneScreen>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Comments on "WhatsApp Hits 3 Billion Users!"{" "}
                {/* Example title */}
              </Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <Avatar sx={{ bgcolor: "#FFC107", mr: 1 }}>U</Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Username
                  </Typography>
                  <Typography variant="body2">Price</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Reply
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Avatar sx={{ bgcolor: "#9C27B0", mr: 1 }}>A</Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    AnotherUser
                  </Typography>
                  <Typography variant="body2">Great post!</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Reply
                  </Typography>
                </Box>
              </Box>
            </PhoneScreen>
            <PhoneFooter>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Add a comment for username..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmojiEmotionsIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleAddComment()} edge="end">
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </PhoneFooter>
          </>
        );
      case "dm": // The Direct Messages view
        return (
          <>
            <PhoneHeader
              title="Chat with User"
              onBack={() => setActiveSection("posts")}
              onMore={() => {}}
            />
            <PhoneScreen
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <MessageBubble
                type="received"
                text="Hey there! I'm so happy you're here, thanks so much for your interest 😊"
              />
              <MessageBubble
                type="received"
                text="Click below and I'll send you the link in just a sec ✨"
              />
              <MessageBubble type="received">
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#25D366",
                    "&:hover": { backgroundColor: "#1DA851" },
                  }}
                >
                  Send me the link
                </Button>
              </MessageBubble>
              {dmHistory.map((msg, index) => (
                <MessageBubble key={index} type={msg.type} text={msg.text} />
              ))}
            </PhoneScreen>
            <PhoneFooter>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Write a message"
                value={dmMessage}
                onChange={(e) => setDmMessage(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmojiEmotionsIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSendDm} edge="end">
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </PhoneFooter>
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
        {/* Builder Controls Component */}
        <BuilderControls
          postContent={postContent}
          onPostContentChange={(e) => setPostContent(e.target.value)}
          onCreatePost={handleCreatePost}
          storyContent={storyContent}
          onStoryContentChange={(e) => setStoryContent(e.target.value)}
          onCreateStory={handleCreateStory}
          onStoryPreviewClick={handleStoryPreviewClick} // Pass the handler for hardcoded story clicks
          commentText={commentText}
          onCommentTextChange={(e) => setCommentText(e.target.value)}
          onAddComment={handleAddComment}
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
            p: 2,
            maxHeight: { xs: "50vh", md: "calc(100vh - 100px)" }, // Constrain height on smaller screens
          }}
        >
          <PhoneFrame>{renderPhoneContent()}</PhoneFrame>
          {/* Phone Bottom Navigation (Post, Comments, DM buttons) */}
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
        </Box>
      </Box>
    </Box>
  );
}

export default App;
