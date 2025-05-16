document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    const languageSelect = document.getElementById('languageSelect');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rating = document.querySelector('input[name="rating"]:checked')?.value;
        const review = document.getElementById('review-text').value;

        if (!rating || !review) {
            alert('평점과 후기 내용을 모두 입력해주세요.');
            return;
        }

        try {
            const response = await submitReview(rating, review);
            if (response.ok) {
                alert('후기가 성공적으로 등록되었습니다.');
                document.getElementById('reviewForm').reset();
                loadReviews();
                loadAiSummary();
            } else {
                alert('후기 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('후기 등록 중 오류가 발생했습니다.');
        }
    };

    const submitReview = async (rating, review) => {
        return await fetch('/api/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rating: parseInt(rating),
                review: review,
            }),
        });
    };

    const deleteReview = async (reviewId) => {
        try {
            const response = await fetch(`/api/review/${reviewId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                loadReviews();
                loadAiSummary();
            } else {
                alert('후기 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('후기 삭제 중 오류가 발생했습니다.');
        }
    };

    const createReviewElement = (review) => {
        return `
            <div class="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-300">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center">
                        <div class="text-yellow-400 text-xl font-bold">${'★'.repeat(review.rating)}</div>
                        <div class="text-gray-400 text-sm ml-2">${new Date(review.created_at).toLocaleString()}</div>
                    </div>
                    <button
                        class="delete-review-btn text-red-500 hover:text-red-700"
                        data-review-id="${review.id}"
                    >
                        삭제
                    </button>
                </div>
                <div class="text-gray-700 text-base leading-relaxed mb-2">${review.review}</div>
            </div>
        `;
    };

    const loadReviews = async () => {
        try {
            const response = await fetch('/api/review');
            const reviews = await response.json();
            const reviewsList = document.getElementById('reviewsList');
            reviewsList.innerHTML = reviews.map(createReviewElement).join('');

            document.querySelectorAll('.delete-review-btn').forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    const reviewId = e.currentTarget.dataset.reviewId;
                    if (reviewId) {
                        if (confirm('정말로 이 후기를 삭제하시겠습니까?')) {
                            deleteReview(reviewId);
                        }
                    } else {
                        console.error('Review ID not found');
                    }
                });
            });
        } catch (error) {
            console.error('Error:', error);
            alert('후기 목록을 불러오는 중 오류가 발생했습니다.');
        }
    };

    const loadAiSummary = async () => {
        const loadingSpinner = document.querySelector('.loading-spinner');
        const summaryContent = document.querySelector('.summary-content');
        const selectedLanguage = languageSelect.value;

        try {
            loadingSpinner.classList.remove('hidden');
            summaryContent.innerHTML = '';
            const response = await fetch(`/api/aisummary?lang=${selectedLanguage}`);
            const data = await response.json();
            summaryContent.innerHTML = data.summary;
        } catch (error) {
            console.error('Error:', error);
            summaryContent.innerHTML = '후기 요약을 불러오는데 실패했습니다.';
        } finally {
            loadingSpinner.classList.add('hidden');
        }
    };

    if (reviewForm) {
        reviewForm.addEventListener('submit', handleSubmit);
    }

    languageSelect.addEventListener('change', loadAiSummary);

    loadReviews();
    loadAiSummary();
});

