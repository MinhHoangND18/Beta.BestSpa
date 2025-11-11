echo "📤 Upload code lên server..."
SERVER_IP="139.59.126.11"
SERVER_PORT="22"
SERVER_USER="root"

REMOTE_DIR=/var/www/spa
LOCAL_FE_DIR=frontend

# Build frontend
echo "🔨 Building frontend..."
cd "$LOCAL_FE_DIR" || exit
rm -r out
rm -rf node_modules/.cache
npm run build
cd ..

# Đóng gói dist thành zip
echo "📦 Zipping build..."
rm -f frontend_build.zip
cd "$LOCAL_FE_DIR"
zip -r ../frontend_build.zip out
cd ..

# Upload zip lên server (dùng sshpass)
echo "📤 Uploading zip..."

sshpass -p "$SERVER_PASS" scp -P "$SERVER_PORT" frontend_build.zip "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/"

# Giải nén trên server (dùng sshpass)
echo "🚀 Deploying on server..."
sshpass -p "$SERVER_PASS" ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_IP" << EOF
cd $REMOTE_DIR
rm -rf frontend
unzip -o frontend_build.zip
mv out frontend
EOF

echo "✅ Done! Frontend deployed successfully."
