document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const rating = document.querySelector('input[name="rating"]:checked')?.value;
            const review = document.getElementById('review-text').value;

            if (!rating || !review) {
                alert('평점과 후기 내용을 모두 입력해주세요.');
                return;
            }

            try {
                const response = await fetch('/api/review', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        rating: parseInt(rating),
                        review: review,
                    }),
                });

                if (response.ok) {
                    alert('후기가 성공적으로 등록되었습니다.');
                    document.getElementById('reviewForm').reset();
                } else {
                    alert('후기 등록에 실패했습니다.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('후기 등록 중 오류가 발생했습니다.');
            }
        });
    }
});
