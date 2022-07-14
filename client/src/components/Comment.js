import React from "react";
import profilepic from "../profilepic.png";
import he from "he";

function CommentsComponent(props){
    return (
        <div>
            {props.comments.map((comment, key) => 
                <div key={comment._id} className="comment">
                    <div className="comment-image">
                        <img src= {profilepic} />
                    </div>
                    <div className="comment-right">
                        <div className="comment-body">
                            <div className="comment-author">{comment.by}</div>
                        </div>
                        <div className="comment-time">{new Date(comment.time).toLocaleString("en-US")}</div>
                        {comment.text && <div className="text" >
                            <p>{he.decode(comment.text).replace(/(<([^>]+)>)/gi, "")}</p>
                        </div>}
                        
                        {comment.kids.length >= 1 && <div className="comment-replies">View {comment.kids.length} replies </div>}
                    </div>
                </div>
            )}
        </div>
    );
}
export default CommentsComponent;